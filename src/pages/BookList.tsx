import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Book } from '../models/Book';
import { Navbar } from '../components/Navbar';
import './main.css';
import axios from 'axios';
import { API_URL } from '../utils/url';
import { useLocation } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

interface BookState {
    user_id?: string;
    heading?: string;
    loggedUser?: boolean;
}

const BookList: React.FC = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    const location = useLocation();
    const state = location.state as BookState;
    
    const cHeading = state?.heading;
    const userId = state?.user_id;

    const getUserSpecificBooks = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        const response = await axios.get(`${API_URL}/api/books?userId=${userId}`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        setBooks(response.data);
        setLoading(false);
    };

    useEffect(
        ()=>{
            getUserSpecificBooks();
        },[]
    );

    const availabilityBodyTemplate = (rowData: Book) => {
        return (
            <Tag 
                severity={rowData.availability_status ? "success" : "danger"}
                value={rowData.availability_status ? "Available" : "Unavailable"}
            />
        );
    };

    const locationBodyTemplate = (rowData: Book) => {
        return (
            <span>{`${rowData.latitude.toFixed(4)}, ${rowData.longitude.toFixed(4)}`}</span>
        );
    };

    const imageBodyTemplate = (rowData: Book) => {
        if (rowData.book_url) {
            return (
                <img 
                    src={rowData.book_url} 
                    alt={rowData.title}
                    className="w-12 h-16 object-cover rounded"
                    style={{ maxHeight: '4rem', objectFit: 'contain' }}
                />
            );
        }
        return <span>No image</span>;
    };

    const header = (
        <div className="flex justify-between items-center">
            <span className="p-input-icon-left">
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                    placeholder="Search"
                />
            </span>
        </div>
    );

    return (
        <div>
        {loading === false ? (
        <div>
            <Navbar />
            <h2 style={{ paddingLeft: "1rem" }}>{cHeading}</h2>
            <div className="card">
                <DataTable
                    value={books}
                    paginator
                    rows={10}
                    dataKey="book_id"
                    globalFilter={globalFilter}
                    header={header}
                    emptyMessage="No books found."
                    selectionMode="single"
                    className="p-datatable-sm"
                >
                    <Column body={imageBodyTemplate} header="Image" />
                    <Column field="title" header="Title" sortable />
                    <Column field="author" header="Author" sortable />
                    <Column field="genre" header="Genre" sortable />
                    <Column field="condition" header="Condition" sortable />
                    <Column 
                        field="availability_status" 
                        header="Status" 
                        body={availabilityBodyTemplate}
                        sortable 
                    />
                    <Column 
                        field="location" 
                        header="Location" 
                        body={locationBodyTemplate}
                    />
                </DataTable>
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

export default BookList;