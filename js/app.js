// App.js

// Default Data for Initialization
// Default Data for Initialization
const defaultProducts = [
    {
        id: 1,
        name: "Earthen Vase",
        price: 3500.00,
        images: [
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581783342308-f792ca438912?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Decors",
        description: "Hand-thrown on a potter's wheel, this unique earthen vase brings a touch of raw nature into your home."
    },
    {
        id: 2,
        name: "Woven Seagrass Basket",
        price: 2500.00,
        images: [
            "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Decors",
        description: "Natural seagrass woven into a sturdy and stylish basket for all your storage needs."
    },
    {
        id: 3,
        name: "Lavender Artisan Soap",
        price: 450.00,
        images: [
            "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Gifts",
        description: "Handmade soap with real lavender buds and essential oils for a calming bath experience."
    },
    {
        id: 4,
        name: "Ceramic Mug Set",
        price: 1200.00,
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Gifts",
        description: "A set of two beautifully glazed ceramic mugs, perfect for your morning coffee."
    },
    {
        id: 5,
        name: "Macrame Wall Hanging",
        price: 4200.00,
        images: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Decors",
        description: "Intricate macrame knotting creates this stunning bohemian wall piece."
    },
    {
        id: 6,
        name: "Wooden Serving Board",
        price: 3000.00,
        images: [
            "https://images.unsplash.com/photo-1603653856395-084007e5d96e?q=80&w=800&auto=format&fit=crop"
        ],
        category: "Decors",
        description: "Solid acacia wood serving board, treated with food-safe oil."
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('products'));

// Initialize Products if empty
if (!products || products.length === 0) {
    products = defaultProducts;
    localStorage.setItem('products', JSON.stringify(products));
} else {
    // Migration: Convert single image string to images array
    let migrated = false;
    products = products.map(p => {
        // Image Migration
        if (!p.images && p.image) {
            p.images = [p.image];
            delete p.image;
            migrated = true;
        }

        // Category Migration
        const categoryMap = {
            "Home Decor": "Decors",
            "Kitchen": "Decors",
            "Storage": "Decors",
            "Wall Art": "Decors",
            "Self Care": "Gifts"
        };

        if (categoryMap[p.category]) {
            p.category = categoryMap[p.category];
            migrated = true;
        }

        return p;
    });

    if (migrated) {
        localStorage.setItem('products', JSON.stringify(products));
        // Force reload to reflect changes if we are on a page that renders products immediately
        // But since this runs at top level, subsequent render calls will use updated data.
    }
}

// DOM Elements
const cartCount = document.querySelector('.cart-count');
const featuredContainer = document.getElementById('featured-products');
const productGrid = document.getElementById('product-grid');
const cartContent = document.getElementById('cart-content');
const adminProductTable = document.getElementById('admin-product-table');

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Home Page: Featured
    if (featuredContainer) {
        renderProducts(products.slice(0, 3), featuredContainer);
    }

    // Shop Page: All Products
    if (productGrid) {
        renderProducts(products, productGrid);
    }

    // Cart Page
    if (cartContent) {
        renderCart();
    }

    // Checkout Page
    const checkoutItems = document.getElementById('checkout-items');
    if (checkoutItems) {
        renderCheckout();
    }

    // Admin Page
    if (adminProductTable) {
        checkAdminAuth();
        renderAdminProducts();
    }
});

// --- Store Functions ---

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function viewProduct(id) {
    localStorage.setItem('viewProductId', id);
    window.location.href = 'product-detail.html';
}

function renderProducts(items, container) {
    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div style="cursor: pointer;" onclick="viewProduct(${product.id})">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatCurrency(product.price)}</p>
                </div>
            </div>
            <div class="product-info" style="padding-top: 0;">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. <a href="products.html" style="color:var(--color-sage); text-decoration:underline;">Start Shopping</a></p>';
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        html += `
            <tr>
                <td>
                    <div class="cart-item-info">
                        <img src="${item.images[0]}" alt="${item.name}" class="cart-item-img">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>${formatCurrency(item.price)}</td>
                <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatCurrency(total)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>${formatCurrency(total)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
        </div>
    `;

    cartContent.innerHTML = html;
}

function renderCheckout() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');

    if (!checkoutItemsContainer) return;

    if (cart.length === 0) {
        window.location.href = 'cart.html'; // Redirect if empty
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name}</span>
            <span>${formatCurrency(item.price)}</span>
        </div>
    `).join('');

    subtotalEl.textContent = formatCurrency(total);
    totalEl.textContent = formatCurrency(total);
}

function processCheckout(e) {
    e.preventDefault();

    // Collect Form Data
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const phone = document.getElementById('whatsapp-number').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    // Construct Order Details
    let orderDetails = `*New Order from ${fname} ${lname}*\n\n`;
    orderDetails += `*Customer Details:*\n`;
    orderDetails += `Name: ${fname} ${lname}\n`;
    orderDetails += `Mobile: ${phone}\n`;
    orderDetails += `Email: ${email}\n`;
    orderDetails += `Address: ${address}, ${city} - ${zip}\n\n`;

    orderDetails += `*Items:*\n`;
    cart.forEach(item => {
        orderDetails += `- ${item.name}: ${formatCurrency(item.price)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderDetails += `\n*Total Amount: ${formatCurrency(total)}*`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/917845818017?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear Cart & Redirect
    alert('Redirecting to WhatsApp to complete your order...');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'index.html';
}

// --- Admin Functions ---

function checkAdminAuth() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        window.location.href = 'login.html';
    }
}

function adminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid credentials!');
    }
}

function adminLogout() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
}

function renderAdminProducts() {
    const tbody = document.querySelector('#admin-product-table tbody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.images[0]}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;"></td>
            <td>${product.name}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn-small edit" data-action="edit" data-id="${product.id}">Edit</button>
                <button class="btn-small delete" data-action="delete" data-id="${product.id}">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Event Delegation for Admin Table
document.addEventListener('DOMContentLoaded', () => {
    const adminTable = document.getElementById('admin-product-table');
    if (adminTable) {
        adminTable.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON') {
                const action = target.getAttribute('data-action');
                const id = parseInt(target.getAttribute('data-id'), 10);

                if (action === 'delete') {
                    deleteProduct(id);
                } else if (action === 'edit') {
                    editProduct(id);
                }
            }
        });
    }
});

let productToDeleteId = null;

function deleteProduct(id) {
    productToDeleteId = id;
    document.getElementById('delete-modal').style.display = 'flex';
}

function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    productToDeleteId = null;
}

function confirmDelete() {
    if (productToDeleteId) {
        try {
            // Filter out the product with the matching ID
            const initialLength = products.length;
            products = products.filter(p => p.id !== productToDeleteId);

            if (products.length === initialLength) {
                console.warn(`Product with ID ${productToDeleteId} not found.`);
                alert('Error: Product not found.');
                closeDeleteModal();
                return;
            }

            localStorage.setItem('products', JSON.stringify(products));
            renderAdminProducts();
            console.log(`Product ${productToDeleteId} deleted successfully.`);
            closeDeleteModal();
        } catch (e) {
            console.error('Error deleting product:', e);
            alert('Failed to delete product: ' + e.message);
            closeDeleteModal();
        }
    }
}

function openAddModal() {
    document.getElementById('modal-title').innerText = 'Add Product';
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-category').value = 'Gifts';
    document.getElementById('product-description').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-modal').style.display = 'flex';
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('modal-title').innerText = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-image').value = product.images.join(', ');
        document.getElementById('product-modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const description = document.getElementById('product-description').value;
    const imageInput = document.getElementById('product-image').value;

    const images = imageInput ? imageInput.split(',').map(url => url.trim()).filter(url => url.length > 0) : ['https://via.placeholder.com/300'];

    if (id) {
        // Edit
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { ...products[index], name, price, category, description, images };
        }
    } else {
        // Add
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, price, category, description, images });
    }

    localStorage.setItem('products', JSON.stringify(products));
    closeModal();
    renderAdminProducts();
}

// Global scope for HTML onclick access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.deleteProduct = deleteProduct; // Still needed for event delegation to call
window.editProduct = editProduct;
window.openAddModal = openAddModal;
window.closeModal = closeModal;
window.saveProduct = saveProduct;
window.confirmDelete = confirmDelete;
window.closeDeleteModal = closeDeleteModal;
window.processCheckout = processCheckout;
window.viewProduct = viewProduct;
