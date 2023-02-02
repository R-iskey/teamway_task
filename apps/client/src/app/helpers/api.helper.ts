import { environment } from '../../environments/environment';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({ baseUrl: environment.NX_SERVER_URL });
