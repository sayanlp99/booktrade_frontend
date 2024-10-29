import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { PrimeIcons } from 'primereact/api';
import { useBookController } from '../controller/Book';
import { Book } from '../models/Book';
import { ProgressSpinner } from 'primereact/progressspinner';
import  { Navbar } from '../components/Navbar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

interface BookGridProps {
  books: Book[];
  onExchangeRequest: (bookId: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onExchangeRequest }) => {
  const navigate = useNavigate();

  function showUserBooks(owner: string, owner_username: string) {
    navigate('/list_book', {
      state: {
        user_id: owner,
        heading: `${owner_username}'s Books`,
        loggedUser: false,
      }
    });
  }

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
                <i className="pi pi-bookmark text-gray-500" />
                <span className="text-sm text-gray-500">
                  {book.genre}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <i className="pi pi-map-marker text-gray-500" />
                <span className="text-sm text-gray-500">
                  {book.latitude}, {book.longitude}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3" onClick={() => {showUserBooks(book.owner, book.owner_username);}} style={{ cursor: 'pointer' }}>
                <Avatar label={book.owner_username[0]} style={{ maxWidth: '1rem', maxHeight: '1rem', fontSize: '0.75rem' }} shape="circle" />
                <span className="text-sm text-gray-500">
                  {book.owner_username}
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [filters, setFilters] = React.useState({ available: true, genre: "", latitude: "", longitude: "" });

  const {
    loading,
    books,
    allFilters,
    handleLoadBooks,
    handleBookSearch
  } = useBookController();

  useEffect(()=> {
    handleLoadBooks();
  },[])

  const handleExchangeRequest = (bookId: string) => {
    console.log(`Exchange requested for book ${bookId}`);
  };

  const handleSearch = () => {
    handleBookSearch(searchQuery, filters);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
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
            <InputText
              placeholder="Search by title, author, or genre" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button label="Search" icon="pi pi-search" onClick={handleSearch} />
          </div>
          <div className="pl-4">
              <div className="my-3">
                <Dropdown value={selectedGenre} 
                  onChange={
                    (e) => {
                      setSelectedGenre(e.value);
                      handleFilterChange("genre", e.value)
                    }
                  } 
                  options={allFilters}
                  optionLabel="name" 
                  placeholder="Genre"
                  className="w-full md:w-14rem"
                  checkmark={true}
                  highlightOnSelect={false}
                />
                <InputText 
                  className='ml-4'
                  placeholder="Location Latitude" 
                  value={filters.latitude} 
                  onChange={(e) => handleFilterChange("latitude", e.target.value)}
                />
                <InputText 
                  className='ml-4'
                  placeholder="Location Longitude" 
                  value={filters.longitude} 
                  onChange={(e) => handleFilterChange("longitude", e.target.value)}
                />
              </div>
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
