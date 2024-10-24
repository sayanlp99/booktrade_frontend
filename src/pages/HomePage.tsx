import React, { useEffect, useState } from 'react';
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
import logo from '../assets/images/logo.png';
import { PrimeIcons } from 'primereact/api';
import { useBookController } from '../controller/Book';
import { Book } from '../models/Book';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const start = (
    <div className="text-xl font-bold cursor-pointer flex flex-row pl-2">
      <img src={logo} alt="Logo" className="login-image" style={{ height: "2rem" }}/>
      <div className="text-xl font-bold cursor-pointer pl-2">
        BookTrade
      </div>
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
        onClick={() => navigate('/add_book')}
      />
      <Avatar
        label='U'
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

interface BookGridProps {
  books: Book[];
  onExchangeRequest: (bookId: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onExchangeRequest }) => {

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <Card
            key={book.book_id}
            className="border-round-xl shadow-md hover:shadow-lg transition-all duration-200"
            style={{ maxWidth: "14rem" }}
          >
            <div className="relative" style={{ maxHeight: "12rem" }}>
              <img
                src={book.book_url || ""}
                alt={book.title}
                className="border-round-xl"
                style={{ maxHeight: "12rem", width: "100%", objectFit: "contain" }}
              />
              <Badge
                value={book.condition}
                className={`absolute }`}
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
                  {book.latitude}, {book.longitude}
                </span>
              </div>
              <Button
                label="Exchange"
                icon="pi pi-exchange"
                onClick={() => onExchangeRequest(book.book_id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const {
    loading,
    books,
    handleLoadBooks
  } = useBookController();

  useEffect(()=> {
    handleLoadBooks();
  },[])

  const handleExchangeRequest = (bookId: string) => {
    console.log(`Exchange requested for book ${bookId}`);
  };

  return (
    <div>
      {loading === false ? (
      <div>
        <Navbar />
        <div >
          <div className="p-inputgroup p-4">
            <span className="p-inputgroup-addon">
                <i className={PrimeIcons.SEARCH}></i>
            </span>
            <InputText placeholder="Search" />
            <Button label="Search" icon="pi pi-search" />
          </div>
          <h1 className="text-3xl font-bold px-4">Available Books for Exchange</h1>
          <BookGrid
            books={books}
            onExchangeRequest={handleExchangeRequest}
          />
        </div>
      </div>
      ) : (
        <div className="loader">
          <div style={{ textAlign: 'center' }}>
          <ProgressSpinner />
          </div>
        </div>
      )
    }
    </div>
  );
};

export default HomePage;
