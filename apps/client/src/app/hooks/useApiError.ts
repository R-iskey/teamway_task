import { useEffect, useState } from 'react';
import { isErrorWithMessage, isFetchBaseQueryError } from '../helpers/apiErrorHandler';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { isArray } from 'class-validator';

export default function useApiError(error: FetchBaseQueryError | SerializedError | undefined): string {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let description = '';

    if (isFetchBaseQueryError(error)) {
      if ('error' in error) {
        description = error.error;
      } else if ('message' in <any>error.data) {
        const errorData = <any>error.data;
        description = isArray(errorData.message) ? errorData.message.join('\n') : errorData.message;
      } else {
        description = JSON.stringify(error.data);
      }
    } else if (isErrorWithMessage(error)) {
      description = error.message;
    }

    setErrorMessage(description);

  }, [error]);

  return errorMessage;
}
