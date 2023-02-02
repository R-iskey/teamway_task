const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 20)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options, EntityMapper) {
    let sort = '';
    const isRawPopulation =
      options?.populate && typeof options?.populate === 'object';
    if (options?.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = '-createdAt';
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).skip(skip).limit(limit).sort(sort);

    if (options.populate && typeof options.populate === 'string') {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    } else if (isRawPopulation) {
      docsPromise = docsPromise.populate(options.populate);
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [_totalResults, _results] = values;
      let results = [..._results];

      if (isRawPopulation) {
        const { path } = options.populate;
        const [key, match] = Object.entries(options.populate.match)[0];
        results = results.filter((_) => {
          if (_[path]) {
            return _[path][key] === match;
          }
          return false;
        });
      }

      const totalResults = isRawPopulation
        ? _totalResults - results.length
        : _totalResults;

      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results: EntityMapper
          ? results.map((item) => new EntityMapper(item))
          : results,
        page,
        limit,
        totalPages,
        totalResults,
      };

      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
