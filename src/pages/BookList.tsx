import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Book } from '../models/Book';
import { Navbar } from '../components/Navbar';
import './main.css';
import axios from 'axios';
import { API_URL } from '../utils/url';
import { useLocation } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

interface BookState {
    user_id?: string;
    heading?: string;
    loggedUser?: boolean;
}

interface EditBookData {
    book_id: string;
    title: string;
    author: string;
    genre: string;
    availability_status: boolean;
    latitude: number;
    longitude: number;
    condition: string;
}

const BookList: React.FC = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editingBook, setEditingBook] = useState<EditBookData | null>(null);

    const location = useLocation();
    const state = location.state as BookState;
    
    const cHeading = state?.heading;
    const userId = state?.user_id;
    const loggedUser = state?.loggedUser;

    const genreOptions = [
        'Fiction', 
        'Non-Fiction', 
        'Mystery', 
        'Science Fiction', 
        'Fantasy', 
        'Romance', 
        'Biography',
        'History',
        'Self-Help',
        'Other'
    ];

    const availabilityOptions = [
        { label: 'Available', value: true },
        { label: 'Unavailable', value: false }
    ];

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

    useEffect(() => {
        getUserSpecificBooks();
    }, []);

    const handleEdit = (book: Book) => {
        setEditingBook({
            book_id: book.book_id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            availability_status: book.availability_status,
            latitude: book.latitude,
            longitude: book.longitude,
            condition: book.condition
        });
        setShowEditDialog(true);
    };

    const handleSaveEdit = async () => {
        if (!editingBook) return;

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = user.token;
            
            await axios.put(
                `${API_URL}/api/books/${editingBook.book_id}`,
                editingBook,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );

            // Refresh the book list
            await getUserSpecificBooks();
            setShowEditDialog(false);
            setEditingBook(null);
        } catch (error) {
            console.error('Error updating book:', error);
            // You might want to show an error message to the user here
        }
    };

    const handleDelete = async (book: Book) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const token = user.token;
                await axios.delete(`${API_URL}/api/books/${book.book_id}`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                await getUserSpecificBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const actionBodyTemplate = (rowData: Book) => {
        if (!loggedUser) return null;
        
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pen-to-square" rounded text severity="warning" aria-label="Edit" onClick={() => handleEdit(rowData)}/>
                <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => handleDelete(rowData)} />
            </div>
        );
    };

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

    const renderDialogFooter = () => {
        return (
            <div>
                <Button
                    onClick={() => setShowEditDialog(false)}
                    
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white hover:bg-green-600"
                >
                    Save
                </Button>
            </div>
        );
    };

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
                            {loggedUser && (
                                <Column 
                                    body={actionBodyTemplate}
                                    header="Actions"
                                    style={{ width: '200px' }}
                                />
                            )}
                        </DataTable>
                    </div>

                    <Dialog
                        visible={showEditDialog}
                        style={{ width: '450px' }}
                        header="Edit Book"
                        modal
                        className="p-fluid"
                        footer={renderDialogFooter()}
                        onHide={() => setShowEditDialog(false)}
                    >
                        {editingBook && (
                            <div>
                                <div className="field">
                                    <label htmlFor="title" className="font-bold block mb-2">Title</label>
                                    <InputText
                                        id="title"
                                        value={editingBook.title}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            title: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="author" className="font-bold block mb-2">Author</label>
                                    <InputText
                                        id="author"
                                        value={editingBook.author}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            author: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="condition" className="font-bold block mb-2">Condition</label>
                                    <InputText
                                        id="condition"
                                        value={editingBook.condition}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            condition: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="genre" className="font-bold block mb-2">Genre</label>
                                    <InputText
                                        id="genre"
                                        value={editingBook.genre}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            genre: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="availability" className="font-bold block mb-2">Availability</label>
                                    <InputText
                                        id="availability"
                                        type='checkbox'
                                        checked={editingBook.availability_status}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            availability_status: e.target.value === "true"
                                        })}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="latitude" className="font-bold block mb-2">Latitude</label>
                                    <InputText
                                        id="latitude"
                                        value={String(editingBook.latitude)}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            latitude: parseFloat(e.target.value) || 0
                                        })}
                                        type="number"
                                        step="0.0001"
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="longitude" className="font-bold block mb-2">Longitude</label>
                                    <InputText
                                        id="longitude"
                                        value={String(editingBook.longitude)}
                                        onChange={(e) => setEditingBook({
                                            ...editingBook,
                                            longitude: parseFloat(e.target.value) || 0
                                        })}
                                        type="number"
                                        step="0.0001"
                                    />
                                </div>
                            </div>
                        )}
                    </Dialog>
                </div>
            ) : (
                <div className="loader">
                    <div style={{ textAlign: 'center' }}>
                        <ProgressSpinner />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;