# TrailTales

**TrailTales** is a fullstack travel journal application designed to let users document their journeys, share stories, and relive memories. Featuring secure authentication and authorization, TrailTales ensures a personalized and protected experience for every traveler.

---

## Features

- **User Authentication and Authorization**  
  - Sign up, sign in, and securely manage sessions with JWT-based authentication.
  
- **Post Management**  
  - Create, view, edit, and delete travel posts.
  - Attach photos, titles, and content to posts.

- **Protected Routes**  
  - Access and manage posts only if authenticated.
  
- **Role-Based and Attribute-Based Access Control**  
  - Ensure only post owners or admins can edit/delete posts.

- **Responsive Design**  
  - Optimized for both desktop and mobile devices.

---

## Technologies Used

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Build Tools:** Vite

---

## Setup and Installation

### Prerequisites
- Node.js (v16+)
- MongoDB

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RobinGoerlach/trailtales.git
   cd trailtales
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   VITE_APP_TRAVEL_JOURNAL_API_URL=http://localhost:5000
   ```

4. **Start the Development Server**
   - **Backend:**
     ```bash
     npm run server
     ```
   - **Frontend:**
     ```bash
     npm run dev
     ```

5. **Access the Application**
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Sign in an existing user
- `GET /auth/me` - Retrieve user data

### Posts
- `GET /posts` - List all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

---

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspiration from travel enthusiasts worldwide.
- Special thanks to the WBS coding school team for guidance.
