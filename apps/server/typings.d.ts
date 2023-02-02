declare module 'mongoose' {
  export interface Model {
    paginate(
      filter,
      options,
      entityMapper
    ): Promise<{
      results: T[];
      totalPages: number;
      limit: number;
      page: number;
      totalResults: number;
    }>;
  }
}
