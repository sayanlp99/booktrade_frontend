import { useState } from 'react';
import { BookService } from '../services/Book';
import { Book } from '../models/Book';

export const useBookController = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    const handleLoadBooks = async () => {
        setLoading(true);
        try {
          const response = await BookService.fetchBooks();
          setBooks(response);
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
    };

    return {
        loading,
        books,
        setLoading,
        setBooks,
        handleLoadBooks,
    }
};

