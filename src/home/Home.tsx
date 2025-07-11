import React, { useState } from "react";
import {
  useDeleteBookMutation,
  useGetAllBookQuery,
  useUpdateBookMutation,
  useBorrowBookMutation,
} from "@/redux/api/booksapi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available?: boolean;
};

const Home = () => {
  const { data: books, isLoading, isError } = useGetAllBookQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [borrowBookMutation] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [borrowBook, setBorrowBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [confirmDeleteBookId, setConfirmDeleteBookId] = useState<string | null>(null);

  const [borrowQuantity, setBorrowQuantity] = useState<number>(1);
  const [borrowDueDate, setBorrowDueDate] = useState<string>("");

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Something went wrong!</div>;
  if (!books || books.length === 0) return <div className="p-4">No books found.</div>;

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setFormData(book);
  };

  const handleBorrow = (book: Book) => {
    setBorrowBook(book);
    setBorrowQuantity(1);
    setBorrowDueDate("");
  };

  const handleDelete = async (bookId: string) => {
    await deleteBook(bookId);
    toast("Deleted successfully!");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (editBook) {
      await updateBook({ id: editBook._id, data: formData });
      setEditBook(null);
      toast("Updated successfully!");
    }
  };

  const handleBorrowSubmit = async () => {
    if (!borrowBook) return;
    if (borrowQuantity < 1) {
      toast("Quantity must be at least 1.");
      return;
    }
    if (borrowQuantity > borrowBook.copies) {
      toast("Not enough copies.");
      return;
    }
    if (!borrowDueDate) {
      toast("Due date required.");
      return;
    }

    await borrowBookMutation({
      book: borrowBook._id,
      quantity: borrowQuantity,
      dueDate: borrowDueDate,
    });
    toast("Borrowed successfully!");
    setBorrowBook(null);
    navigate("/borrowsummary");
  };

  return (
    <div className="p-4">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Author</th>
              <th className="border p-2 text-left">Genre</th>
              <th className="border p-2 text-left">ISBN</th>
              <th className="border p-2 text-left">Copies</th>
              <th className="border p-2 text-left">Available</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="border p-2 break-words">{book.title}</td>
                <td className="border p-2 break-words">{book.author}</td>
                <td className="border p-2 break-words">{book.genre}</td>
                <td className="border p-2 break-words">{book.isbn}</td>
                <td className="border p-2">{book.copies}</td>
                <td className="border p-2">{book.available ? "Yes" : "No"}</td>
                <td className="border p-2 flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                    onClick={() => setConfirmDeleteBookId(book._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`px-3 py-1 rounded text-xs ${book.copies === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white"
                      }`}
                    onClick={() => handleBorrow(book)}
                    disabled={book.copies === 0}
                    title={book.copies === 0 ? "Unavailable" : ""}
                  >
                    Borrow
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50">
          <div className="bg-white p-4 rounded w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Book</h2>
            <label className="block mb-2 text-sm font-bold">
              Title
            </label>
            <input
              className="w-full border p-2 mb-2"
              name="title"
              value={formData.title || ""}
              onChange={handleFormChange}
              placeholder="Title"
            />
              <label className="block mb-2 text-sm font-bold">
              Author
            </label>
            <input
              className="w-full border p-2 mb-2"
              name="author"
              value={formData.author || ""}
              onChange={handleFormChange}
              placeholder="Author"
            />
              <label className="block mb-2 text-sm font-bold">
              Genre
            </label>
            <input
              className="w-full border p-2 mb-2"
              name="genre"
              value={formData.genre || ""}
              onChange={handleFormChange}
              placeholder="Genre"
            />
              <label className="block mb-2 text-sm font-bold">
              ISBN
            </label>
            <input
              className="w-full border p-2 mb-2"
              name="isbn"
              value={formData.isbn || ""}
              onChange={handleFormChange}
              placeholder="ISBN"
            />
              <label className="block mb-2 text-sm font-bold">
              Copies
            </label>
            <input
              className="w-full border p-2 mb-4 "
              type="number"
              name="copies"
              value={formData.copies || ""}
              onChange={handleFormChange}
              placeholder="Copies"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setEditBook(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BORROW MODAL */}
      {borrowBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50">
          <div className="bg-white p-4 rounded w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
              Borrow: {borrowBook.title}
            </h2>
            <label className="block mb-2">
              Quantity (max {borrowBook.copies})
            </label>
            <input
              className="w-full border p-2 mb-2"
              type="number"
              min="1"
              max={borrowBook.copies}
              value={borrowQuantity}
              onChange={(e) => setBorrowQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
            <label className="block mb-2">Due Date</label>
            <input
              className="w-full border p-2 mb-4"
              type="date"
              value={borrowDueDate}
              onChange={(e) => setBorrowDueDate(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setBorrowBook(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleBorrowSubmit}
              >
                Confirm Borrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {confirmDeleteBookId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50">
          <div className="bg-white p-4 rounded w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setConfirmDeleteBookId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={async () => {
                  await handleDelete(confirmDeleteBookId);
                  setConfirmDeleteBookId(null);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
