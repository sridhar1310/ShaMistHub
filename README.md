# Sha Mist Hub - E-commerce Website

A handcrafted gifts and decor e-commerce platform with admin panel and WhatsApp order integration.

## Features

- 🛍️ Product catalog with multiple images per product
- 🛒 Shopping cart functionality
- 📱 WhatsApp order integration
- 👨‍💼 Admin panel for product management
- 💾 MongoDB database for cross-browser product synchronization
- 📦 Product categories: Gifts & Decors

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- localStorage for cart management
- Responsive design

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- RESTful API
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation OR MongoDB Atlas account)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sridhar1310/ShaMistHub.git
   cd ShaMistHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**

   **Option A: MongoDB Atlas (Recommended - Free Cloud Database)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Update `.env` file with your connection string

   **Option B: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service
   - Use the default connection string in `.env`

4. **Configure environment variables**
   - Copy `.env.example` to `.env` (already done)
   - Update `MONGODB_URI` with your MongoDB connection string
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shamisthub
   PORT=5000
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:
```bash
npm run dev:all
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:3000`

### Run Backend Only
```bash
npm run server
```

### Run Frontend Only
```bash
npm run client
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/health` | Health check |

## Admin Panel

- **URL**: `http://localhost:3000/login.html`
- **Username**: `admin`
- **Password**: `admin123`

### Admin Features
- Add new products
- Edit existing products
- Delete products
- Manage product images (multiple images per product)
- Set product categories (Gifts/Decors)

## Project Structure

```
ShaMistHub/
├── server/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── models/
│   │   └── Product.js      # Product schema
│   ├── routes/
│   │   └── products.js     # API routes
│   └── server.js           # Express server
├── js/
│   └── app.js              # Frontend JavaScript
├── css/
│   └── style.css           # Styles
├── assets/
│   ├── logo.jpg
│   └── hero-bg.jpg
├── *.html                  # HTML pages
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json
└── README.md
```

## Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables on your hosting platform
2. Deploy the backend
3. Update `API_URL` in `js/app.js` to your backend URL

### Frontend Deployment (Netlify/Vercel/GitHub Pages)
1. Update `API_URL` in `js/app.js`
2. Deploy the frontend files

## Troubleshooting

### Products not loading
- Ensure backend server is running (`npm run server`)
- Check MongoDB connection in `.env`
- Check browser console for errors

### CORS errors
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in `server/server.js`

### MongoDB connection failed
- Verify MongoDB is running (if local)
- Check connection string in `.env`
- Ensure IP whitelist is configured (if using Atlas)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For support or queries, contact via WhatsApp: +917845818017

---

Made with ❤️ for Sha Mist Hub
