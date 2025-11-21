Secure E-Commerce Platform with Payment Integration

A modern, full-featured e-commerce web application built with Next.js, Express.js, and MongoDB, featuring secure authentication, product management, Stripe payment integration, and admin functionalities.

Table of Contents

Features

Tech Stack

Installation

Environment Variables

Usage

API Endpoints

Screenshots
Future Improvements

Features

User Authentication: Sign up, login, and logout for customers and admins.

Role-Based Access Control: Admin and customer roles with specific permissions.

Product Management: CRUD operations for products including images, price, description, and stock.

Order Management: Users can create orders, view history, cancel orders. Admins can update order status.

Payment Integration: Stripe checkout for secure payments.

Responsive UI: Modern, user-friendly interface for both desktop and mobile.

Analytics Dashboard: Charts for transactions, orders, and users (pie & bar charts).

Persistent State: Zustand for global state management with localStorage persistence.

Tech Stack

Frontend: Next.js, React, Tailwind CSS, Zustand

Backend: Express.js, Node.js

Database: MongoDB (Mongoose)

Authentication: JWT, Role-based Authorization

Payments: Stripe API

Charts & UI: Chart.js, Tailwind UI, react-icons

Installation

Clone the repository

git clone <your-repo-url>
cd ecommerce-project


Install backend dependencies

cd ecommerce-backend
npm install


Install frontend dependencies

cd ../ecommerce-frontend
npm install

Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>

Usage

Run the backend

cd ecommerce-backend
npm run dev


Run the frontend

cd ecommerce-frontend
npm run dev


Open your browser and navigate to:
http://localhost:3000

API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Login user
DELETE	/auth/logout	Logout user
Products
Method	Endpoint	Description
GET	/product/products	Get all products
POST	/product/create	Create new product (Admin only)
PATCH	/product/update/:id	Update product (Admin only)
DELETE	/product/delete/:id	Delete product (Admin only)
Orders
Method	Endpoint	Description
POST	/order/createorder	Create new order
GET	/order/orderhistory	Get user order history
GET	/order/allorders	Get all orders (Admin only)
PATCH	/order/updateorderstatus	Update order status (Admin only)
DELETE	/order/cancelorder	Cancel an order
Screenshots

Sign In / Sign Up Page

Home / Product Carousel

Admin Dashboard

Order Analytics Charts

<img width="1886" height="885" alt="hss1" src="https://github.com/user-attachments/assets/fa426740-74fa-44f3-8bc6-3da73592849c" />
<img width="1859" height="881" alt="hss2" src="https://github.com/user-attachments/assets/db353ff1-b8f2-4c8e-bf2d-2c5be9bce7b1" />
<img width="1883" height="906" alt="hss3" src="https://github.com/user-attachments/assets/a450616c-7ec5-4168-b092-d62dda2c7924" />


<img width="1902" height="790" alt="hss4" src="https://github.com/user-attachments/assets/2d69fcd7-edca-4129-8bfe-c2dc9072ca67" />

Future Improvements

Add reviews and ratings for products.

Add wishlist and favorites functionality.

Implement multi-currency support.

Add email notifications for orders and signups.

Add search and filter for products.
