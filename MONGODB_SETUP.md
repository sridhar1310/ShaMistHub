# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Choose the **FREE** tier (M0 Sandbox)

### Step 2: Create a Cluster
1. After logging in, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create Cluster"** (takes 1-3 minutes)

### Step 3: Create Database User
1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `shamist_admin`
5. Set password: (create a strong password and save it!)
6. User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP
1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your current IP for better security
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://shamist_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before the `?`:
   ```
   mongodb+srv://shamist_admin:yourpassword@cluster0.xxxxx.mongodb.net/shamisthub?retryWrites=true&w=majority
   ```

### Step 6: Update .env File
1. Open `.env` file in your project
2. Replace the `MONGODB_URI` line with your connection string:
   ```
   MONGODB_URI=mongodb+srv://shamist_admin:yourpassword@cluster0.xxxxx.mongodb.net/shamisthub?retryWrites=true&w=majority
   PORT=5001
   ```
3. Save the file

### Step 7: Restart the Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run server
```

You should see:
```
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server running on port 5001
```

## Seed Initial Products (Optional)

To add the default products to your database, you can create them through the admin panel:

1. Go to `http://localhost:3000/login.html`
2. Login with `admin` / `admin123`
3. Add products manually

Or run this script (create `server/seed.js`):

```javascript
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const defaultProducts = [
    {
        name: "Earthen Vase",
        price: 3500.00,
        images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop"],
        category: "Decors",
        description: "Hand-thrown on a potter's wheel, this unique earthen vase brings a touch of raw nature into your home."
    },
    // ... add more products
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Product.deleteMany({});
        await Product.insertMany(defaultProducts);
        console.log('Products seeded!');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
```

Then run: `node server/seed.js`

## Troubleshooting

### Connection Timeout
- Check if your IP is whitelisted
- Verify username and password are correct
- Ensure you replaced `<password>` in the connection string

### Authentication Failed
- Double-check username and password
- Make sure the user has "Read and write" permissions

### Network Error
- Check your internet connection
- Try allowing access from anywhere (0.0.0.0/0)

## Security Notes

For production:
- Use specific IP whitelisting instead of "Allow from Anywhere"
- Use environment variables for sensitive data
- Enable MongoDB's built-in security features
- Use strong passwords

---

**Need Help?** Check the [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
