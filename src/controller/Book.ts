import { useState } from 'react';
import { BookService } from '../services/Book';
import { Book } from '../models/Book';
import { API_URL } from '../utils/url';
import axios from 'axios';

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

    const handleBookSearch = async (query: string = "", filters: any = {}) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: query,
          latitude: filters.latitude || '',
          longitude: filters.longitude || '',
          available: filters.available ? 'true' : 'false',
          genre: filters.genre || ''
        });
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        const response = await axios.get(`${API_URL}/api/books/search?${params}`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        setBooks(response.data.results);
      } catch (error) {
        console.error("Failed to load books", error);
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
        handleBookSearch,
    }
};

