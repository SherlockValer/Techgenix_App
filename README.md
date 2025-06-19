# 🌐 TechGenix

Welcome to **TechGenix** — a modern **e-commerce platform** built on the MERN stack. It offers a seamless shopping experience for smart electronics — from browsing to checkout — powered by a robust React frontend and connected to a dynamic backend. It's styled with Bootstrap, communicates with a backend using the Fetch API, and is designed with clean architecture in mind.

---
## 🚀 Features

### 🏠 Home Page
- Displays a landing page with featured categories
- Clicking a category redirects to the filtered product listing page

### 🛍️ Product Listing
- Shows all products in a grid format
- Each product card includes:
  - Product image
  - Product name
  - Price
  - Rating
  - Discount
  - “Add to Cart” button
  - “Add to Wishlist” icon
- Filters available:
  - ✅ **Category Filter** – Checkbox-based category selection
  - ⭐ **Ratings Filter** – Filter by minimum rating using radio buttons

### ↕️ Sort by Price
- Sort products using:
  - Low to High
  - High to Low  
  *(Implemented via radio buttons)*

### 🔍 Product Detail Page
- Clicking on a product opens a dedicated page showing:
  - Full product details
  - “Add to Cart” (or increase quantity if already in cart) and “Buy Now” options

### ❤️ Wishlist Management
- Navigate to the wishlist from the navbar
- Each wishlist item shows options to:
  - Remove from wishlist (wishlist icon)
  - Add to cart 

### 🛒 Cart Management
- Navigate to the cart from the navbar
- View all added products with:
  - Quantity controls (Increase/Decrease)
  - Remove from cart
  - Add to wishlist
- Price details card with:
  - Total price calculation
  - “Proceed to Checkout” button

### 🏠 Address Management
- Add multiple delivery addresses
- Choose one address for delivery during checkout

### ✅ Checkout
- After selecting an address, proceed to checkout
- Shows an order summary and “Order Placed Successfully” message
- Orders are saved to the backend

### 🙍 User Profile
- View user info: name, email, phone, address (static data)
- Add new address from profile
- View order history (previously placed orders)

### ⏳ Loaders & 🔔 Alerts
- Loading indicator shown while fetching data
- Toast notifications for actions like:
  - Add/Remove to cart or wishlist
  - Quantity changes

### 🔎 Search
- Real-time search box in the navbar
- Filters product listing by name
---


## 🔧 Tech Stack

Here's what powers this project:

### 🖥️ Frontend
- ⚛️ **React (with Vite)** – For fast development and smooth rendering
- 🧭 **React Router** – For navigating between pages
- 🧠 **Context API + Custom Hooks** – To manage global state cleanly
- 🌐 **Fetch API** – To talk to the backend
- 🎨 **Bootstrap + CSS** – To keep the UI responsive and simple
- 🔔 **React Toastify** – To show beautiful, non-intrusive messages

### 🗄️ Backend
- 🟢 **Node.js + Express.js** – RESTful APIs for product, user, and order management
- 🛢️ **MongoDB** – NoSQL database for storing users, products, orders, etc.
- 📦 **Mongoose** – ODM to interact with MongoDB

---

## 🗂️ Project Structure (For the curious)

Here’s a quick peek into the project folders:

### 🔷 Frontend (React + Vite)

```
Techgenix_App/
├── public/           # Static files (favicon, etc.)
└── src/
    ├── assets/       # Images and icons
    ├── components/   # Reusable UI pieces
    ├── context/      # App-wide state management
    ├── hooks/        # Custom API calls and logic using React hooks
    ├── pages/        # Route-based components (Home, Products, About, etc.)
    ├── utils/        # Helper functions
    ├── App.jsx       # Main app component with routes
    └── main.jsx      # Vite entry file
```

### 🟩 Backend (Node.js + Express)

```
Techgenix_Server/
├── db/           # DB config, environment setup
├── models/           # Mongoose schemas
├── .env              # Environment variables
├── server.js         # Entry point, API routes (e.g. /users, /products)
└── package.json      # Dependencies and scripts

```

---

## 🚀 Getting Started

Want to run this locally? It’s simple:

```bash
# Clone the project
git clone https://github.com/SherlockValer/Techgenix_App.git
cd Techgenix_App

# Install dependencies
npm install

# Start the dev server
npm run dev
```
---
## 🌍 Environment Setup

Make sure to create a `.env` file in the root with your API endpoint:

```
VITE_API_BASE_URL=https://techgenix-server.vercel.app
```
--- 
## 🧩 Backend Repository

To run the full stack, use the backend here:  
🔗 [TechGenix Backend GitHub Repo](https://github.com/YourUsername/Techgenix_Backend)


---



## 📸 Try it Out

Live preview available here:  
👉 [https://techgenix-app.vercel.app](https://techgenix-app.vercel.app)

Explore the features, test API integration, and experience how it all fits together.

---

## 🤝 Contributions

Got suggestions or ideas to improve this project?  
Open a pull request, report a bug, or just say hi!

---

## 👋 About the Creator

Hi! I’m **Vaibhav Chopde**, a passionate web developer exploring the MERN stack one project at a time.

- 🌐 Portfolio: [https://vaibhav-chopde-pvla.vercel.app/](https://vaibhav-chopde-pvla.vercel.app/)
- 🧑‍💻 GitHub: [@SherlockValer](https://github.com/SherlockValer)
- ✨ Project: [techgenix-app.vercel.app](https://techgenix-app.vercel.app)

---

Thanks for stopping by. I hope you enjoy exploring **Techgenix** as much as I enjoyed building it!
