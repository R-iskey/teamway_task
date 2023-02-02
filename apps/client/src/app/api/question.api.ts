import { createApi } from '@reduxjs/toolkit/query/react';
import { ListResponse } from '../types/api.types';
import { baseQuery } from '../helpers/api.helper';

export type Option = {
  _id: string;

  text: string;
}

export type Question = {
  _id: string;
  question: string;
  options: Option[];
}

export type QuestionCreatePayload = Omit<Question, '_id' | 'options'> & { options: Omit<Option, '_id'>[] };

export type QuestionUpdatePayload = Question;

type QuestionResponse = ListResponse<Question>;

const TagType = 'Questions';

export const questionApi = createApi({
  reducerPath: 'questions',
  tagTypes: [TagType],
  baseQuery,
  endpoints: (builder) => ({
    listQuestions: builder.query<Question[], number | void>({
      query: (page = 1, limit = 25) => `/questions?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: TagType, id: _id } as const)),
            { type: TagType, id: 'LIST' }
          ]
          : [{ type: TagType, id: 'LIST' }],
      transformResponse: (response: QuestionResponse) => response.results
    }),
    editQuestion: builder.mutation<Question, QuestionUpdatePayload>({
      query: ({ _id, ...body }) => ({
        url: `/questions/${_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, id) => [{ type: TagType, _id: id }]
    }),
    addQuestion: builder.mutation<Question, QuestionCreatePayload>({
      query: (body) => ({
        url: `/questions`,
        method: 'POST',
        body
      }),
      invalidatesTags: () => [{ type: TagType }]
    }),
    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: TagType, id }]
    })
  })
});

export const {
  useListQuestionsQuery,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useAddQuestionMutation
} = questionApi;
