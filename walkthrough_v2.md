# Walkthrough - Sha Mist Hub (v2.0)

The application has been rebranded to **Sha Mist Hub** and upgraded with dynamic product management and an admin panel.

## New Features

### 1. Branding & Currency
- **Name**: Updated to "Sha Mist Hub" across all pages.
- **Logo**: Integrated the new logo in the header.
- **Currency**: All prices are now displayed in Indian Rupees (₹).

### 2. Admin Panel
- **URL**: `admin.html` (Access via Footer > Admin Login).
- **Login**: `login.html`
    - **Username**: `admin`
    - **Password**: `admin123`
- **Dashboard**:
    - View all products in a table.
    - **Add Product**: Create new items with name, price, category, and image URL.
    - **Edit Product**: Modify existing details.
    - **Delete Product**: Remove items from the store.

### 3. Dynamic Store
- The store now uses `localStorage` to save products.
- Changes made in the Admin Panel (Add/Edit/Delete) are immediately reflected on the Home and Shop pages.

## How to Test

1. **Open the Website**:
   - Open `index.html` to see the new branding and default products in ₹.

2. **Admin Login**:
   - Scroll to the footer and click **Admin Login**.
   - Enter `admin` / `admin123`.

3. **Manage Products**:
   - **Add**: Click "+ Add Product", fill in details (use a URL for the image), and save.
   - **Edit**: Click "Edit" on an existing item, change the price, and save.
   - **Delete**: Click "Delete" to remove an item.

4. **Verify Changes**:
   - Go back to `products.html` or `index.html` to see your changes reflected live.

## Technical Notes
- **Data Persistence**: All data is stored in the browser's `localStorage`. If you clear your browser cache, it will reset to the default product list.
- **Images**: For new products, you must provide a valid Image URL (hosted online).
