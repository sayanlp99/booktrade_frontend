import axios from 'axios';
import { API_URL } from '../utils/url';

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
};
