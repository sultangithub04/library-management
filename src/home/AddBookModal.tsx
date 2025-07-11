import { useAddBookMutation } from '@/redux/api/booksapi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

type BookFormData = {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
};

const AddBookModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<BookFormData>();
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const navigate = useNavigate()
  const onSubmit = async (data: BookFormData) => {
    const payload = {
      ...data,
      copies: Number(data.copies),
      available: true,
    };
    await addBook(payload);
    setOpen(false)
    toast("Book added successfully");
    reset()
    navigate("/")
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="border-none">
            Add Book
          </div>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Book</DialogTitle>
              <DialogDescription>
                Fill in the details below and click Save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title', { required: true })} placeholder="Book Title" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register('author', { required: true })} placeholder="Author Name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <select
                  id="genre"
                  {...register('genre', { required: true })}
                  className="border rounded p-2"
                >
                  <option value="">Select Genre</option>
                  <option value="FICTION">FICTION</option>
                  <option value="NON_FICTION">NON_FICTION</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="HISTORY">HISTORY</option>
                  <option value="BIOGRAPHY">BIOGRAPHY</option>
                  <option value="FANTASY">FANTASY</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn"  {...register('isbn', { required: true })} placeholder="ISBN" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} placeholder="Description" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="copies">Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  {...register('copies', { required: true, min: 0 })}
                  placeholder="Number of Copies"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>

            {isError && <p className="text-red-500">Something went wrong!</p>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBookModal;
