import { useState } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const isAuthenticated = localStorage.getItem('user');
  const navigate = useNavigate();

  const categories = [
    "Fiction", "Non-fiction", "Mystery", "Sci-Fi", "Romance", "Biography", "History", "Self-help"
  ]

  const books = [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "/placeholder.svg?height=200&width=150", rating: 4.8, location: "New York, NY" },
    { id: 2, title: "1984", author: "George Orwell", cover: "/placeholder.svg?height=200&width=150", rating: 4.6, location: "Los Angeles, CA" },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen", cover: "/placeholder.svg?height=200&width=150", rating: 4.7, location: "Chicago, IL" },
    { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "/placeholder.svg?height=200&width=150", rating: 4.5, location: "Houston, TX" },
    { id: 5, title: "Moby-Dick", author: "Herman Melville", cover: "/placeholder.svg?height=200&width=150", rating: 4.4, location: "Philadelphia, PA" },
    { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", cover: "/placeholder.svg?height=200&width=150", rating: 4.3, location: "Phoenix, AZ" },
    { id: 7, title: "Jane Eyre", author: "Charlotte Brontë", cover: "/placeholder.svg?height=200&width=150", rating: 4.6, location: "San Antonio, TX" },
    { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "/placeholder.svg?height=200&width=150", rating: 4.7, location: "San Diego, CA" },
  ]

  
  
  if(isAuthenticated === "null"){
    localStorage.removeItem('user');
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">BookSwap</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            
          </nav>
          <div className="flex items-center space-x-4">
            <Avatar>
              
            </Avatar>
            
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-6">Find your next great read</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <InputText
                type="text"
                placeholder="Search for books by title, author, or genre"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Browse by category</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button key={category}>
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Available for exchange</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                
                  <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                
                  <div className="text-lg mb-2">{book.title}</div>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {book.location}
                  </div>
                <div className="p-4 pt-0">
                  <Button className="w-full">Request Exchange</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About BookSwap</h4>
              <p className="text-sm">BookSwap is a platform for book lovers to exchange their favorite reads with others in their community.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">How it Works</a></li>
                <li><a href="#" className="hover:underline">Safety Guidelines</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107  0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 BookSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}