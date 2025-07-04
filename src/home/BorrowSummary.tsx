"use client";

import React from "react";
import { useGetBorrowSummaryQuery } from "@/redux/api/booksapi";

export type BorrowSummaryItem = {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}; 

const BorrowSummary: React.FC = () => {
  const {
    data: borrowSummary,
    isLoading,
    isError,
  } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <div>Loading summary...</div>;
  if (isError) return <div>Something went wrong!</div>;
  if (!borrowSummary || borrowSummary.length === 0)
    return <div>No borrowed books found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Book Title</th>
            <th className="border p-2 text-left">ISBN</th>
            <th className="border p-2 text-left">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {borrowSummary.map((item: BorrowSummaryItem, index: number) => (
            <tr key={index}>
              <td className="border p-2">{item.book.title}</td>
              <td className="border p-2">{item.book.isbn}</td>
              <td className="border p-2">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
