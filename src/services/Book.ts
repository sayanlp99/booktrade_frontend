import axios from 'axios';
import { API_URL } from '../utils/url';
import { Book } from '../models/Book';

export const BookService = {
    fetchBooks: async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = user.token;
            const response = await axios.get(`${API_URL}/api/books/all`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            return response.data.results;
        }
        catch (e) {
            throw new Error('Failed to get books');
        }
    },
    addBook: async (book: Omit<Book, 'book_id' | 'book_url' | 'book_path' | 'owner' | 'owner_username'>, token: string): Promise<void> => {
        try{
            const formData = new FormData();
            formData.append('title', book.title);
            formData.append('author', book.author);
            formData.append('genre', book.genre);
            formData.append('condition', book.condition);
            formData.append('availability_status', String(book.availability_status));
            formData.append('latitude', book.latitude.toString());
            formData.append('longitude', book.longitude.toString());
            if (book.image) {
                formData.append('image', book.image);
            }
            const response = await fetch(`${API_URL}/api/books`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to add book');
            }
        }
        catch(e){
            throw new Error('Failed to add book');
        }
    }
};