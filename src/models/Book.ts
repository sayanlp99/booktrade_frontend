export interface Book {
  book_id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability_status: boolean;
  latitude: number;
  longitude: number;
  owner: string;
  owner_username: string;
  book_url: string | null;
  book_path: string | null;
  image?: File | null;
}
