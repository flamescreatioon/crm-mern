CRM (MERN) Project Checklist
Legend: ✅ = done | ⏳ = in progress | 🔲 = not started

1. Project Setup
✅ Create project folders (server/, client/)

✅ Initialize Node.js backend with Express

✅ Connect backend to MongoDB

✅ Create .env for environment variables

2. Authentication Backend
✅ Install and configure bcryptjs for password hashing

✅ Install and configure jsonwebtoken (JWT)

✅ Create User model (MongoDB schema)

✅ Implement registration API (/api/auth/register)

✅ Implement login API (/api/auth/login)

🔲 Implement JWT auth middleware to protect routes

✅ Test registration and login APIs in Postman

3. Frontend Setup
✅ Initialize React frontend with create-react-app

✅ Remove TailwindCSS and set up vanilla CSS structure

✅ Create basic dashboard layout with React + vanilla CSS

4. Frontend Authentication
🔲 Create login page (React)

🔲 Create registration page (React)

🔲 Connect login & register forms to backend APIs

🔲 Store JWT in localStorage

🔲 Protect frontend routes so only logged-in users see dashboard

5. Dashboard Features
🔲 Create Sidebar component (links: Home, Customers, Leads, Reports, Settings)

🔲 Create Navbar component (show logged-in user, logout button)

🔲 Create dashboard stats cards (dynamic data from backend)

🔲 Fetch & display list of customers from backend

🔲 Implement Add Customer form

🔲 Implement Edit Customer form

🔲 Implement Delete Customer functionality

🔲 Implement Leads management (CRUD)

🔲 Implement Reports page

6. Advanced Features
🔲 Search & filter customers

🔲 Pagination for large data sets

🔲 Export data to CSV/Excel

🔲 Role-based access (admin vs user)

7. Deployment
🔲 Prepare frontend and backend for production build

🔲 Deploy MongoDB to Atlas

🔲 Deploy backend to Render/Heroku

🔲 Deploy frontend to Vercel/Netlify

🔲 Connect frontend to live backend

Right now, we’re in progress at:

JWT auth middleware (backend protection)

Frontend auth flow setup

Basic dashboard styling