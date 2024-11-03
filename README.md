

# Frontend Documentation for Booktrade

## 1. Project Overview

- **Project Name**: Booktrade
- **Description**: Booktrade is a platform designed to facilitate book exchanges, allowing users to list, search, and manage book trades efficiently.
- **Tech Stack**: React, TypeScript, PrimeReact.
- **Features**:
  - User Authentication: Secure login and registration functionality.
  - Book CRUD Operations: Manage books listed for exchange.
  - State Management: Handled with Context API for efficient data handling.
  - UI Components: Reusable UI elements to ensure a cohesive design.
  - API Integration: Communication with backend APIs for data operations.

## 2. Installation and Setup

### Prerequisites
- **Node.js**: Ensure Node.js (>= version 14.x) is installed.
- **npm or yarn**: Recommended npm (>= version 6.x) or yarn (>= version 1.x) for dependency management.

### Installation
Follow these steps to set up the project:
```bash
# Clone the repository
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install
```

### Running the Application
Below are the commands to run the application, along with environment configurations:
```bash
# Start the development server (runs at http://localhost:3000 by default)
npm start

# For production build
npm run build
```

## 3. Folder Structure

The project is organized for modularity, readability, and scalability:

```
/public                   # Public assets
  ├── assets/images       # Images used across the app (e.g., logos, banners)

/src
  ├── assets/images       # Additional images/icons for internal use
  ├── components          # Reusable UI components (e.g., Navbar)
  ├── controller          # Contains files for managing complex data and interactions
      ├── BookList.ts     # Controls logic for listing books
  ├── hooks               # Custom hooks
      ├── useAuth.ts      # Hook for authentication handling
      ├── useLocalStorage.ts # Hook for localStorage operations
  ├── models              # Type definitions for data models
  ├── pages               # Main page components for routing
      ├── AddBook.tsx     # Page to add new books
      ├── BookList.tsx    # Page for listing books
      ├── ForgetPassword.tsx # Password recovery page
      ├── HomePage.tsx    # Main landing page
      ├── LoginPage.tsx   # User login page
      ├── RegisterPage.tsx # User registration page
  ├── services            # API service files
      ├── Book.ts         # API calls related to books
      ├── ForgetPassword.ts # API calls for password recovery
      ├── Login.ts        # API calls for login
      ├── Register.ts     # API calls for registration
  ├── utils               # Utility functions
  ├── App.tsx             # Root component
  ├── ProtectedRoute.tsx  # Higher-order component to protect routes
  ├── index.tsx           # Application entry point
  ├── reportWebVitals.ts  # Performance monitoring
```

## 4. Environment Variables

Define necessary environment variables in a `.env` file at the root of the project.

- **API_URL**: Base URL for backend API endpoints.

Example `.env` file:
```
API_URL=http://localhost:8000/api
```

## 5. Key Functionalities

### User Authentication
- **Description**: Users can register, log in, and reset passwords. Authentication state is managed globally.
- **Components Used**: `Login.tsx`, `Register.tsx`, `ForgetPassword.tsx`
- **State Management**: Managed with Context API to provide authentication state across components.
- **API Endpoints**:
  - `POST /auth/login`: User login
  - `POST /auth/register`: New user registration
  - `POST /auth/forgot-password`: Password reset

### Core Features
Detailed breakdown of primary features:

- **Book Listing**:
  - Component: `BookList.tsx`
  - Controller: `BookList.ts` (handles data processing and API integration)
  - API Endpoint: `GET /books` - fetches the list of available books.

- **Add/Edit/Delete Book**:
  - Component: `AddBook.tsx`
  - API Endpoints:
    - `POST /books` for adding a book
    - `PUT /books/:id` for editing a book
    - `DELETE /books/:id` for removing a book

### Error Handling
Errors are managed using UI alerts or notifications for user feedback. For network-related errors, retry logic can be implemented as needed.

## 6. API Integration

### Base API Configuration
The project uses a service layer under the `services` folder to handle API interactions using axios or fetch.

### List of Endpoints
| Endpoint         | Method | Purpose                     | Component            |
|------------------|--------|-----------------------------|-----------------------|
| `/api/books`     | GET    | Fetch list of books         | `BookList`           |
| `/api/auth/login`| POST   | User login                  | `Login`              |
| `/api/books`     | POST   | Add a new book              | `AddBook`            |
| `/api/books/:id` | PUT    | Update book details         | `AddBook`            |

## 7. State Management

- **Solution**: Context API is used for global state management, providing lightweight yet effective state sharing across components.
- **Structure**: All state-related files, such as context providers, are organized within the `contexts` folder for modularity and reusability.
- **Example**:
  ```typescript
  const UserContext = createContext<UserContextType | null>(null);
  ```

## 8. Styling

- **CSS/SCSS**: The project uses SCSS for styling, enabling modular and maintainable styles.
- **Global Styles**: Defined in `src/pages/main.css` to ensure consistency across components.
- **Theming**: PrimeReact theme is applied to provide a consistent look and feel.

## 9. Component Library

- **UI Library**: PrimeReact is used for commonly styled components like buttons, inputs, and dialog boxes.
- **Custom Components**: Additional reusable components include `Navbar.tsx` and `ProtectedRoute.tsx` for navigation and access control.

## 11. Deployment

- **Hosting Service**: Firebase hosting.
- **Build Commands**:
  ```bash
  npm run build
  firebase deploy
  ```
- **CI/CD**: GitHub Actions can be set up for automated testing and deployment processes.

## 12. Troubleshooting

Below are some common issues and their solutions:
- **Installation Errors**: Ensure that Node.js and npm versions meet the prerequisites.
- **API Errors**: Verify the `API_URL` in the `.env` file.
- **Build Errors**: Use `npm run clean` to clear the cache and rebuild.

---