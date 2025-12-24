// Data Models
let menuItems = [];
let cart = [];
let orders = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeNavigation();
    renderMenu();
    renderCart();
    initializeMenuForm();
    initializePaymentModal();
    
    // Set current month and year for sales report
    const now = new Date();
    document.getElementById('report-month').value = String(now.getMonth() + 1).padStart(2, '0');
    document.getElementById('report-year').value = now.getFullYear();
});

// Navigation
function initializeNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Refresh data when switching tabs
            if (targetTab === 'manage-menu') {
                renderMenuItems();
            } else if (targetTab === 'sales-report') {
                generateSalesReport();
            }
        });
    });
}

// Data Management
function loadData() {
    // Load menu items
    const storedMenu = localStorage.getItem('menuItems');
    if (storedMenu) {
        menuItems = JSON.parse(storedMenu);
    } else {
        // Initialize with default items
        initializeDefaultMenu();
    }
    
    // Load cart
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    
    // Load orders
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
    }
}

function saveData() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
}

function initializeDefaultMenu() {
    const defaultItems = [
        { 
            id: '1', 
            name: 'Idly', 
            price: 30, 
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&q=80', 
            description: 'Soft and fluffy steamed rice cakes, served with sambar and coconut chutney' 
        },
        { 
            id: '2', 
            name: 'Puttu', 
            price: 40, 
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&q=80', 
            description: 'Steamed rice flour with coconut, a traditional South Indian breakfast dish' 
        },
        { 
            id: '3', 
            name: 'Poori', 
            price: 35, 
            image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=400&h=300&fit=crop&q=80', 
            description: 'Deep-fried puffed bread, crispy and golden, served with curry' 
        },
        { 
            id: '4', 
            name: 'Coffee', 
            price: 25, 
            image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop&q=80', 
            description: 'Authentic South Indian filter coffee, rich and aromatic' 
        },
        { 
            id: '5', 
            name: 'Dosai', 
            price: 50, 
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80', 
            description: 'Crispy fermented rice crepe, served with sambar and chutney' 
        }
    ];
    menuItems = defaultItems;
    saveData();
}

// Menu Display (Billing Section)
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    if (menuItems.length === 0) {
        menuGrid.innerHTML = '<p>No menu items available. Add items in Manage Menu section.</p>';
        return;
    }
    
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        // Handle both web URLs and local paths
        const imageSrc = item.image.startsWith('http://') || item.image.startsWith('https://') 
            ? item.image 
            : item.image;
        card.innerHTML = `
            <img src="${imageSrc}" alt="${item.name}" class="menu-item-image" onerror="this.src='https://via.placeholder.com/200x150?text=${encodeURIComponent(item.name)}'">
            <div class="menu-item-info">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-price">₹${item.price.toFixed(2)}</div>
                <div class="menu-item-description">${item.description || ''}</div>
                <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Cart Management
function addToCart(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(c => c.menuItemId === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            menuItemId: itemId,
            quantity: 1,
            price: item.price
        });
    }
    
    saveData();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(c => c.menuItemId !== itemId);
    saveData();
    renderCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.menuItemId === itemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveData();
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const payNowBtn = document.getElementById('pay-now');
    const printBillBtn = document.getElementById('print-bill');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Cart is empty</p>';
        cartTotal.textContent = '0.00';
        // Disable buttons when cart is empty
        if (payNowBtn) payNowBtn.disabled = true;
        if (printBillBtn) printBillBtn.disabled = true;
        return;
    }
    
    // Enable buttons when cart has items
    if (payNowBtn) payNowBtn.disabled = false;
    if (printBillBtn) printBillBtn.disabled = false;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(cartItem => {
        const item = menuItems.find(m => m.id === cartItem.menuItemId);
        if (!item) return;
        
        const itemTotal = cartItem.quantity * cartItem.price;
        total += itemTotal;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${cartItem.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity('${cartItem.menuItemId}', -1)">-</button>
                <span class="quantity-display">${cartItem.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${cartItem.menuItemId}', 1)">+</button>
                <button class="remove-item-btn" onclick="removeFromCart('${cartItem.menuItemId}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        saveData();
        renderCart();
    }
}

// Event Listeners for Cart
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('pay-now').addEventListener('click', showPaymentModal);
document.getElementById('print-bill').addEventListener('click', printBill);

// Payment Modal
function initializePaymentModal() {
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-payment');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.getElementById('confirm-payment').addEventListener('click', confirmPayment);
}

function showPaymentModal() {
    if (cart.length === 0) {
        alert('Cart is empty. Add items to cart first.');
        return;
    }
    
    const total = calculateCartTotal();
    const modal = document.getElementById('payment-modal');
    const paymentAmount = document.getElementById('payment-amount');
    const qrContainer = document.getElementById('qr-code-container');
    
    paymentAmount.textContent = total.toFixed(2);
    qrContainer.innerHTML = '';
    
    // Generate QR Code using QRCode.js
    // For payment gateway, we'll use Razorpay UPI QR
    generatePaymentQR(total);
    
    modal.classList.add('active');
}

function generatePaymentQR(amount) {
    const qrContainer = document.getElementById('qr-code-container');
    
    // Create UPI payment link with actual UPI ID
    // Format: upi://pay?pa=UPI_ID&pn=MerchantName&am=amount&cu=INR
    const upiId = 'gurudevar24@okicici'; // Your actual UPI ID
    const merchantName = 'Guru Devar'; // Merchant name
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount.toFixed(2)}&cu=INR&tn=Restaurant%20Bill`;
    
    // Generate QR Code - using online API for reliability
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    // Create QR code image using online API (works reliably)
    const qrImage = document.createElement('img');
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;
    qrImage.alt = 'Payment QR Code';
    qrImage.style.cssText = 'max-width: 100%; height: auto; border: 2px solid #ddd; border-radius: 8px; padding: 10px; background: white; display: block; margin: 0 auto;';
    qrContainer.appendChild(qrImage);
    
    // Add UPI ID display below QR code
    const upiDisplay = document.createElement('div');
    upiDisplay.style.cssText = 'margin-top: 15px; text-align: center; font-size: 14px; color: #2c3e50; font-weight: 600;';
    upiDisplay.textContent = `UPI ID: ${upiId}`;
    qrContainer.appendChild(upiDisplay);
    
    // Alternative: Try using QRCode library if available
    if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
        // Use canvas-based QR code generation
        const canvas = document.createElement('canvas');
        QRCode.toCanvas(canvas, upiLink, {
            width: 250,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function (error) {
            if (error) {
                console.error('QR Code generation error:', error);
                // Keep the image-based QR code
            } else {
                // Replace image with canvas
                qrContainer.innerHTML = '';
                canvas.style.cssText = 'max-width: 100%; height: auto; border: 2px solid #ddd; border-radius: 8px; padding: 10px; background: white; display: block; margin: 0 auto;';
                qrContainer.appendChild(canvas);
                qrContainer.appendChild(upiDisplay);
            }
        });
    }
}

function confirmPayment() {
    const total = calculateCartTotal();
    
    if (cart.length === 0) {
        alert('Cart is empty. Cannot process payment.');
        return;
    }
    
    // For UPI QR code payment flow:
    // 1. Customer scans QR code and pays via UPI app
    // 2. Customer clicks "Confirm Payment" after completing payment
    // 3. Order is saved and cart is cleared
    
    const confirmMessage = `Confirm that payment of ₹${total.toFixed(2)} has been received?\n\n` +
                          `This will:\n` +
                          `• Save the order\n` +
                          `• Clear the cart\n` +
                          `• Record payment as completed`;
    
    if (confirm(confirmMessage)) {
        // Create order with payment confirmation
        const paymentId = 'UPI_' + Date.now();
        completeOrder({ 
            payment_id: paymentId,
            payment_method: 'UPI',
            upi_id: 'gurudevar24@okicici',
            amount: total
        });
    }
}

function completeOrder(paymentResponse) {
    if (cart.length === 0) {
        alert('Cart is empty. Cannot complete order.');
        return;
    }
    
    // Get menu items for order details
    const orderItems = cart.map(cartItem => {
        const menuItem = menuItems.find(m => m.id === cartItem.menuItemId);
        return {
            menuItemId: cartItem.menuItemId,
            name: menuItem ? menuItem.name : 'Unknown Item',
            quantity: cartItem.quantity,
            price: cartItem.price,
            total: cartItem.quantity * cartItem.price
        };
    });
    
    const total = calculateCartTotal();
    
    // Create order record
    const order = {
        id: 'ORD_' + Date.now(),
        items: orderItems,
        total: total,
        date: new Date().toISOString(),
        paymentStatus: 'completed',
        paymentId: paymentResponse.payment_id || 'UPI_' + Date.now(),
        paymentMethod: paymentResponse.payment_method || 'UPI',
        upiId: paymentResponse.upi_id || 'gurudevar24@okicici'
    };
    
    // Save order to localStorage
    orders.push(order);
    saveData();
    
    // Clear cart
    cart = [];
    saveData();
    renderCart();
    
    // Close payment modal
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Show success message with order details
    const orderDate = new Date(order.date).toLocaleString('en-IN');
    alert(`✅ Payment Successful!\n\n` +
          `Order ID: ${order.id}\n` +
          `Amount: ₹${total.toFixed(2)}\n` +
          `Payment Method: ${order.paymentMethod}\n` +
          `Date: ${orderDate}\n\n` +
          `Order has been saved and cart cleared.`);
}

function calculateCartTotal() {
    return cart.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);
}

// Print Bill
function printBill() {
    if (cart.length === 0) {
        alert('Cart is empty. Add items to cart first.');
        return;
    }
    
    const billContent = document.getElementById('print-bill-content');
    const billDate = document.getElementById('bill-date');
    const billNumber = document.getElementById('bill-number');
    const billItems = document.getElementById('bill-items');
    const billTotal = document.getElementById('bill-total');
    
    // Set bill details
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    billDate.textContent = dateStr + ' ' + timeStr;
    billNumber.textContent = 'BILL-' + Date.now().toString().slice(-6);
    
    // Populate bill items
    billItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(cartItem => {
        const item = menuItems.find(m => m.id === cartItem.menuItemId);
        if (!item) return;
        
        const itemTotal = cartItem.quantity * cartItem.price;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td style="text-align: center;">${cartItem.quantity}</td>
            <td style="text-align: right;">₹${cartItem.price.toFixed(2)}</td>
            <td style="text-align: right;">₹${itemTotal.toFixed(2)}</td>
        `;
        billItems.appendChild(row);
    });
    
    billTotal.textContent = total.toFixed(2);
    
    // Show bill content temporarily for printing
    billContent.style.display = 'block';
    billContent.style.position = 'absolute';
    billContent.style.left = '-9999px';
    
    // Wait a moment for content to render, then print
    setTimeout(() => {
        window.print();
        // Hide again after print dialog closes
        setTimeout(() => {
            billContent.style.display = 'none';
        }, 100);
    }, 100);
}

// Menu Management (CRUD)
function initializeMenuForm() {
    const form = document.getElementById('menu-form');
    const cancelBtn = document.getElementById('cancel-edit');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveMenuItem();
    });
    
    cancelBtn.addEventListener('click', () => {
        resetMenuForm();
    });
}

function saveMenuItem() {
    const id = document.getElementById('menu-item-id').value;
    const name = document.getElementById('menu-name').value;
    const price = parseFloat(document.getElementById('menu-price').value);
    const image = document.getElementById('menu-image').value;
    const description = document.getElementById('menu-description').value;
    
    if (id) {
        // Update existing item
        const index = menuItems.findIndex(m => m.id === id);
        if (index !== -1) {
            menuItems[index] = { id, name, price, image, description };
        }
    } else {
        // Create new item
        const newItem = {
            id: Date.now().toString(),
            name,
            price,
            image,
            description
        };
        menuItems.push(newItem);
    }
    
    saveData();
    resetMenuForm();
    renderMenuItems();
    renderMenu(); // Update billing menu too
}

function editMenuItem(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    if (!item) return;
    
    document.getElementById('menu-item-id').value = item.id;
    document.getElementById('menu-name').value = item.name;
    document.getElementById('menu-price').value = item.price;
    document.getElementById('menu-image').value = item.image;
    document.getElementById('menu-description').value = item.description || '';
    
    document.getElementById('save-menu-item').textContent = 'Update Item';
    
    // Scroll to form
    document.querySelector('.menu-form-container').scrollIntoView({ behavior: 'smooth' });
}

function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    menuItems = menuItems.filter(m => m.id !== itemId);
    saveData();
    renderMenuItems();
    renderMenu(); // Update billing menu too
}

function resetMenuForm() {
    document.getElementById('menu-form').reset();
    document.getElementById('menu-item-id').value = '';
    document.getElementById('save-menu-item').textContent = 'Add Item';
}

function renderMenuItems() {
    const grid = document.getElementById('menu-items-grid');
    grid.innerHTML = '';
    
    if (menuItems.length === 0) {
        grid.innerHTML = '<p>No menu items. Add your first item using the form above.</p>';
        return;
    }
    
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item-admin-card';
        // Handle both web URLs and local paths
        const imageSrc = item.image.startsWith('http://') || item.image.startsWith('https://') 
            ? item.image 
            : item.image;
        card.innerHTML = `
            <img src="${imageSrc}" alt="${item.name}" class="menu-item-admin-image" onerror="this.src='https://via.placeholder.com/250x150?text=${encodeURIComponent(item.name)}'">
            <div class="menu-item-admin-info">
                <h4>${item.name}</h4>
                <p><strong>Price:</strong> ₹${item.price.toFixed(2)}</p>
                <p><strong>Description:</strong> ${item.description || 'N/A'}</p>
                <div class="menu-item-admin-actions">
                    <button class="btn btn-edit" onclick="editMenuItem('${item.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteMenuItem('${item.id}')">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Sales Report
document.getElementById('generate-report').addEventListener('click', generateSalesReport);

function generateSalesReport() {
    const month = document.getElementById('report-month').value;
    const year = document.getElementById('report-year').value;
    
    // Filter orders by month and year
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
        const orderYear = orderDate.getFullYear();
        return orderMonth === month && orderYear === parseInt(year);
    });
    
    // Calculate totals
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Update summary
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2);
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('avg-order-value').textContent = avgOrderValue.toFixed(2);
    
    // Calculate item-wise sales
    const itemSales = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            const menuItem = menuItems.find(m => m.id === item.menuItemId);
            if (menuItem) {
                if (!itemSales[menuItem.name]) {
                    itemSales[menuItem.name] = { quantity: 0, revenue: 0 };
                }
                itemSales[menuItem.name].quantity += item.quantity;
                itemSales[menuItem.name].revenue += item.quantity * item.price;
            }
        });
    });
    
    // Display item-wise sales
    const tableBody = document.querySelector('#item-sales-table tbody');
    tableBody.innerHTML = '';
    
    if (Object.keys(itemSales).length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No sales data for this period</td></tr>';
    } else {
        Object.entries(itemSales).forEach(([itemName, data]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${data.quantity}</td>
                <td>₹${data.revenue.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Show report
    document.getElementById('report-results').classList.add('active');
}
