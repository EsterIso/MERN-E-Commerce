# Product Store - E-commerce Platform

A modern e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js), featuring secure payments with Stripe and authentication with Clerk.

## About This Project

This e-commerce platform was developed as a learning project to deepen my understanding of the MERN stack and explore modern web technologies like Stripe for payment processing, Clerk for authentication, and Chakra UI for building responsive interfaces. While fully functional, this project represents my journey in mastering these technologies rather than a production-ready commercial solution.

![Slide 1](https://i.imgur.com/BzcffgY.gif)

## Features

- **Modern UI**: Built with Chakra UI for a responsive and accessible design
- **Dark/Light Mode**: Toggle between dark and light themes
- **User Authentication**: Secure login/signup with Clerk
- **Product Management**: Browse, add, and manage products
- **Shopping Cart**: Add items, adjust quantities, and remove products
- **Checkout System**: Secure payment processing with Stripe
- **State Management**: Efficient state handling with Zustand

## Tech Stack

### Frontend
- React 18
- Vite
- Chakra UI
- Clerk Authentication
- React Router
- Zustand (State Management)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Stripe API
- Clerk SDK

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Stripe Account
- Clerk Account

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/product-store.git
   cd product-store
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. Environment Variables:

   Create a `.env` file in the root directory:
   ```
   # Server
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   
   # Clerk
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

   Create a `.env` file in the frontend directory:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:5000/api
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend
   npm run dev
   
   # In another terminal, start frontend
   cd frontend
   npm run dev
   ```

5. The application should now be running:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Project Structure

```
product-store/
├── frontend/                # React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   └── index.html           # Application Html
│   └── package.json         # Frontend dependencies
│
├── backend/
│   ├── config/              # Connect to MongoDB
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   └── server.js            # Entry point for the server
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
└── package.json             # Backend dependencies
```

## API Endpoints

- **Authentication**
  - Handled by Clerk

- **Products**
  - `GET /api/products` - Get all products
  - `POST /api/products` - Create a new product (admin only)
  - `PUT /api/products/:id` - Update a product (admin only)
  - `DELETE /api/products/:id` - Delete a product (admin only)

- **Cart**
  - `POST /api/cart/create` - Create user's cart
  - `GET /api/cart` - Get user's cart
  - `POST /api/cart/items` - Add item to cart
  - `PATCH /api/cart/items/:itemId` - Update cart item quantity
  - `DELETE /api/cart/items/:itemId` - Remove item from cart
  - `DELETE /api/cart` - Clear cart

- **Payments**
  - `POST /api/stripe/create-checkout-session` - Create payment intent
  - `POST /api/webhook` - Stripe webhook endpoint

## Deployment

### Frontend
The frontend can be deployed to Vercel, Netlify, or any other static site hosting:

```bash
cd frontend
npm run build
```

### Backend
The backend can be deployed to Heroku, Render, or any other Node.js hosting:

```bash
# Make sure you set all environment variables in your hosting platform
git push heroku main
```

## Future Improvements
- [ ] Add product categories and filtering
- [ ] Implement search functionality
- [ ] Add user reviews and ratings
- [ ] Create admin dashboard
- [ ] Add wishlist feature
- [ ] Implement product recommendations
- [ ] Add email notifications

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Clerk](https://clerk.dev/)
- [Stripe](https://stripe.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
