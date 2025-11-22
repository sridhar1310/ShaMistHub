# Deploy Backend to Render.com - Step by Step Guide

## Step 1: Sign Up for Render.com

1. Go to https://render.com/
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub account

---

## Step 2: Create a New Web Service

1. Once logged in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if prompted
4. Find and select your repository: **ShaMistHub**
5. Click **"Connect"**

---

## Step 3: Configure Your Web Service

Fill in the following settings:

### Basic Settings
- **Name**: `shamisthub-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Singapore, Oregon)
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`

### Build & Deploy Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type
- **Free** (select the free tier)

---

## Step 4: Add Environment Variables

This is **CRITICAL** - your app won't work without this!

1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add the following:

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://Sridhar:Samuel%401310@shamisthub.ddv3wle.mongodb.net/shamisthub?retryWrites=true&w=majority&appName=Shamisthub`

   **Variable 2:**
   - Key: `PORT`
   - Value: `5001`

   **Variable 3:**
   - Key: `NODE_ENV`
   - Value: `production`

---

## Step 5: Deploy!

1. Click **"Create Web Service"** at the bottom
2. Wait for deployment (takes 2-5 minutes)
3. You'll see logs showing the build process
4. When done, you'll see: ✅ **"Live"**

---

## Step 6: Get Your Backend URL

Once deployed, you'll get a URL like:
```
https://shamisthub-backend.onrender.com
```

**Copy this URL!** You'll need it for the next step.

---

## Step 7: Update Frontend to Use Production Backend

Now we need to update your frontend to use the deployed backend instead of localhost.

### Option A: Environment-based (Recommended)

I'll help you update `js/app.js` to automatically detect if it's running locally or in production.

### Option B: Manual Update

Change this line in `js/app.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

To:
```javascript
const API_URL = 'https://shamisthub-backend.onrender.com/api';
```

---

## Step 8: Test Your Deployed Backend

1. Open your Render dashboard
2. Click on your service
3. Copy the URL (e.g., `https://shamisthub-backend.onrender.com`)
4. Test the health endpoint in your browser:
   ```
   https://shamisthub-backend.onrender.com/api/health
   ```
5. You should see:
   ```json
   {"status":"Server is running","timestamp":"..."}
   ```

---

## Step 9: Update GitHub Pages

After updating the frontend code:

1. Commit the changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

2. GitHub Pages will automatically update

3. Visit your GitHub Pages site - products should now load! 🎉

---

## Important Notes

### Free Tier Limitations
- ⚠️ **Render free tier spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds to wake up
- This is normal for free tier
- Upgrade to paid tier ($7/month) for always-on service

### MongoDB Atlas
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to the whitelist

### CORS
- Your backend is already configured to accept requests from any origin
- This is fine for development, but consider restricting in production

---

## Troubleshooting

### Build Failed
- Check the logs in Render dashboard
- Ensure `package.json` has all dependencies
- Verify Node version compatibility

### MongoDB Connection Failed
- Check environment variable `MONGODB_URI` is correct
- Verify MongoDB Atlas IP whitelist
- Check username/password are correct

### 503 Service Unavailable
- Service is spinning up (free tier)
- Wait 30-60 seconds and try again

### CORS Errors
- Check backend URL in frontend is correct
- Ensure CORS is enabled in `server/server.js`

---

## Next Steps

Once deployed:
1. Test adding products via admin panel
2. Verify products appear on GitHub Pages
3. Test in multiple browsers
4. Share your live site! 🚀

---

**Your Live URLs:**
- Frontend (GitHub Pages): `https://sridhar1310.github.io/ShaMistHub/`
- Backend (Render): `https://shamisthub-backend.onrender.com` (you'll get this after deployment)

---

Need help? Let me know which step you're stuck on!
