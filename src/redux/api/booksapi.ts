import type { BorrowSummaryItem } from "@/home/BorrowSummary";
import type { Book } from "@/home/Home";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000"
    baseUrl: "https://librarymanagement-lac.vercel.app"
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (body) => ({
        url: "/api/books",
        method: "POST",
        body,

      }),
      invalidatesTags: ["book"]
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "DELETE",


      }),
      invalidatesTags: ["book"]
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getAllBook: builder.query<Book[], void>({
      query: () => "/api/books",
      transformResponse: (response: { sucess: boolean; data: Book[] }) => response.data,
      providesTags: ["book"]
    }),
    borrowBook: builder.mutation<{ message: string }, { book: string; quantity: number; dueDate: string }>({
      query: ({ book, quantity, dueDate }) => ({
        url: `/api/borrow`,
        method: 'POST',
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ["book"],
    }),

    getBorrowSummary: builder.query({
      query: () => "/api/borrow",
       transformResponse: (response: { sucess: boolean; data: BorrowSummaryItem[]}) => response.data,
      providesTags: ["book"]
    }),

  })
})

export const {useGetBorrowSummaryQuery, useAddBookMutation, useGetAllBookQuery, useDeleteBookMutation, useUpdateBookMutation, useBorrowBookMutation } = bookApi;