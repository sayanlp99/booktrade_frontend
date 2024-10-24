import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { BookService } from '../services/Book';
import { Book } from '../models/Book';
import { useNavigate } from 'react-router-dom';

const AddBook: React.FC = () => {
    const navigate = useNavigate(); 
  const [book, setBook] = useState<Omit<Book, 'book_id' | 'book_url' | 'book_path'>>({
    title: '',
    author: '',
    genre: '',
    condition: '',
    availability_status: true,
    latitude: 0,
    longitude: 0,
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (e: any) => {
    setBook((prevBook) => ({
      ...prevBook,
      image: e.files[0],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    try {
      await BookService.addBook(book, token);
      alert('Book added successfully!');
      setBook({
        title: '',
        author: '',
        genre: '',
        condition: '',
        availability_status: true,
        latitude: 0,
        longitude: 0,
        image: null,
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="field">
        <label htmlFor="title">Title</label>
        <InputText id="title" name="title" value={book.title} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="author">Author</label>
        <InputText id="author" name="author" value={book.author} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre</label>
        <InputText id="genre" name="genre" value={book.genre} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="condition">Condition</label>
        <InputText id="condition" name="condition" value={book.condition} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="availabilityStatus">Availability Status</label>
        <InputText
          id="availabilityStatus"
          name="availability_status"
          type="checkbox"
          checked={book.availability_status}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="latitude">Latitude</label>
        <InputText id="latitude" name="latitude" type="number" value={String(book.latitude)} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="longitude">Longitude</label>
        <InputText id="longitude" name="longitude" type="number" value={String(book.longitude)} onChange={handleChange} required />
      </div>

      <div className="field">
        <label htmlFor="image">Image</label>
        <FileUpload
          name="image"
          accept="image/*"
          maxFileSize={1000000}
          onSelect={handleImageUpload}
          auto
          customUpload
        />
      </div>

      <Button label="Add Book" type="submit" />
    </form>
  );
};

export default AddBook;
