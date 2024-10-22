import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import loginImage from '../assets/images/banner.svg';


const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        console.log('Navigate to Home');
      }
    },
    {
      label: 'Add Book',
      icon: 'pi pi-plus',
      command: () => {
        console.log('Add Book button clicked');
      }
    }
  ];

  const start = (
    <div className="text-xl font-bold cursor-pointer">
      <img src={loginImage} alt="Login Illustration" className="login-image" />
    </div>
  );

  const center = (
    <span className="p-input-icon-left w-full sm:w-64 md:w-96 mx-auto">
      <i className="pi pi-search" />
      <InputText
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </span>
  );

  const end = (
    <div className="flex items-center gap-4">
      <Button
        label="Add Book"
        icon="pi pi-plus"
        className="p-button-primary p-button-sm"
        onClick={() => console.log('Add Book clicked')}
      />
      <Avatar
        image="https://via.placeholder.com/40" // Replace with the actual user profile picture URL
        shape="circle"
        className="cursor-pointer"
      />
    </div>
  );

  return (
    <div className="shadow-lg">
      <Menubar start={start} end={end} className="relative w-full">
        {/* <div className="absolute inset-0 flex justify-center"> */}
          {center}
        {/* </div> */}
      </Menubar>
    </div>
  );
};

interface Book {
  id: string;
  title: string;
  author: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  imageUrl: string;
  location: string;
}

interface BookGridProps {
  books: Book[];
  onExchangeRequest: (bookId: string) => void;
}

const getConditionClass = (condition: Book['condition']) => {
  const classes = {
    'New': 'bg-green-500',
    'Like New': 'bg-blue-500',
    'Good': 'bg-yellow-500',
    'Fair': 'bg-orange-500',
    'Poor': 'bg-red-500'
  };
  return classes[condition] || 'bg-gray-500';
};

const BookGrid: React.FC<BookGridProps> = ({ books, onExchangeRequest }) => {
  const sampleBooks: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      condition: 'Like New',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'New York, NY'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      condition: 'Good',
      imageUrl: 'https://www.booksatruestory.com/wp-content/uploads/2016/02/Book-Cover-Twenty-Thousand-Leagues-Under-Sea-Jules-Verne.jpg',
      location: 'Los Angeles, CA'
    },
    // Add more sample books as needed
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleBooks.map((book) => (
          <Card
            key={book.id}
            className="border-round-xl shadow-md hover:shadow-lg transition-all duration-200"
            style={{ minWidth: "12rem" }}
          >
            <div className="relative" style={{ maxHeight: "12rem" }}>
              <img
                src={book.imageUrl}
                alt={book.title}
                className="border-round-xl"
                style={{ maxHeight: "12rem", width: "100%", objectFit: "contain" }}
              />
              <Badge
                value={book.condition}
                className={`absolute ${getConditionClass(book.condition)}`}
                style={{ top: "0.5rem", right: "0.5rem", zIndex: 2 }}  // Padding inside image
              />
            </div>
            <div className="mt-3">
              <h3 className="text-xl font-semibold mb-1 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-2 line-clamp-1">
                by {book.author}
              </p>
              <div className="flex items-center gap-1 mb-3">
                <i className="pi pi-map-marker text-gray-500" />
                <span className="text-sm text-gray-500">
                  {book.location}
                </span>
              </div>
              <Button
                label="Exchange"
                icon="pi pi-exchange"
                onClick={() => onExchangeRequest(book.id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  // Same state and useEffect logic to fetch books as before
  const [books, setBooks] = useState<Book[]>([]);

  const handleExchangeRequest = (bookId: string) => {
    console.log(`Exchange requested for book ${bookId}`);
  };

  return (
    <>
      <Navbar />
      <div >
        <h1 className="text-3xl font-bold mb-6 px-4">Available Books for Exchange</h1>
        <BookGrid
          books={books}
          onExchangeRequest={handleExchangeRequest}
        />
      </div>
    </>
  );
};

export default HomePage;
