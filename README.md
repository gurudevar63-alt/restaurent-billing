# Restaurant Billing Website

A complete single-page restaurant billing application with menu management, cart operations, billing, payment gateway integration, and sales reporting. All data is stored in localStorage.

## Features

### 1. Menu Management (CRUD Operations)
- **Create**: Add new menu items with name, price, image, and description
- **Read**: Display all menu items in grid/list view
- **Update**: Edit existing menu items
- **Delete**: Remove menu items
- Default items included: Idly, Puttu, Poori, Coffee, Dosai

### 2. Billing Interface
- Menu items displayed as cards with images
- Add items to cart by clicking on menu cards
- Cart sidebar showing selected items with quantities
- Quantity increment/decrement controls in cart
- Real-time total price calculation
- Clear cart functionality

### 3. Payment & Billing
- **Pay Now Button**: 
  - Generates QR code for payment
  - QR code displayed in modal popup
  - Payment success handling
- **Bill Print**: 
  - Print-friendly bill format
  - Includes itemized list, quantities, prices, and total
  - Uses browser's print functionality

### 4. Monthly Sales Report
- Filter orders by month and year
- Display:
  - Total revenue
  - Number of orders
  - Average order value
  - Item-wise sales breakdown
- Data sourced from completed orders

### 5. Navigation & UI
- Tab-based navigation: Billing | Manage Menu | Sales Report
- Responsive design for mobile and desktop
- Modern, clean UI with card-based layouts
- Smooth animations and transitions

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. **Clone or download the project files**
   ```
   - index.html
   - styles.css
   - script.js
   - images/ (directory)
   - README.md
   ```

2. **Add Menu Item Images**
   - Place menu item images in the `images/` directory
   - Recommended image names:
     - `idly.jpg`
     - `puttu.jpg`
     - `poori.jpg`
     - `coffee.jpg`
     - `dosai.jpg`
   - Images should be in JPG, PNG, or WebP format
   - Recommended size: 200x150px or larger (will be automatically resized)

3. **Open the Application**
   - Simply open `index.html` in your web browser
   - No build process or server setup required

## Usage Guide

### Adding Menu Items
1. Navigate to the "Manage Menu" tab
2. Fill in the form:
   - Item Name (required)
   - Price in ₹ (required)
   - Image Path (e.g., `images/idly.jpg`)
   - Description (optional)
3. Click "Add Item"
4. The item will appear in both the menu management list and the billing menu

### Editing Menu Items
1. Go to "Manage Menu" tab
2. Find the item you want to edit
3. Click the "Edit" button
4. Modify the details in the form
5. Click "Update Item"
6. Or click "Cancel" to discard changes

### Deleting Menu Items
1. Go to "Manage Menu" tab
2. Find the item you want to delete
3. Click the "Delete" button
4. Confirm the deletion

### Processing Orders
1. Navigate to the "Billing" tab
2. Click on menu items to add them to the cart
3. Adjust quantities using +/- buttons in the cart
4. Review the total amount
5. Click "Pay Now" to generate payment QR code
6. After payment, click "Payment Successful" to complete the order
7. Or click "Print Bill" to print a bill without payment

### Viewing Sales Reports
1. Navigate to the "Sales Report" tab
2. Select the month and year
3. Click "Generate Report"
4. View:
   - Total revenue for the period
   - Number of orders
   - Average order value
   - Item-wise sales breakdown

## Data Storage

All data is stored in the browser's localStorage:
- **menuItems**: Array of menu items
- **cart**: Current shopping cart items
- **orders**: Completed orders history

### Data Persistence
- Data persists across browser sessions
- To reset all data, clear browser localStorage:
  - Open browser developer tools (F12)
  - Go to Application/Storage tab
  - Clear localStorage

## Technical Details

### Data Models

**Menu Item:**
```javascript
{
  id: string,
  name: string,
  price: number,
  image: string,
  description: string
}
```

**Cart Item:**
```javascript
{
  menuItemId: string,
  quantity: number,
  price: number
}
```

**Order:**
```javascript
{
  id: string,
  items: Array<CartItem>,
  total: number,
  date: ISO string,
  paymentStatus: string
}
```

### Payment Integration

The application includes QR code generation for payments. For production use:
1. Replace the placeholder QR code generation with a proper payment gateway (Razorpay, Stripe, etc.)
2. Update the UPI ID in the `generateQRCode()` function
3. Implement proper payment verification callbacks

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
Edit `styles.css` and modify the color variables:
- Primary color: `#667eea`
- Secondary color: `#764ba2`
- Success color: `#28a745`
- Danger color: `#dc3545`

### Adding Features
The code is modular and well-organized. Key areas:
- Menu management: `script.js` - Menu Management section
- Cart system: `script.js` - Cart Management section
- Payment: `script.js` - Payment & QR Code section
- Reports: `script.js` - Sales Report section

## Troubleshooting

### Images Not Displaying
- Check that image paths are correct
- Ensure images are in the `images/` directory
- Verify image file names match the paths in menu items
- Check browser console for 404 errors

### Data Not Persisting
- Ensure localStorage is enabled in your browser
- Check browser storage settings
- Clear browser cache if issues persist

### Print Not Working
- Ensure pop-up blocker is not blocking print dialog
- Check browser print settings
- Try using browser's print preview

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check:
- Browser console for error messages
- localStorage data in browser developer tools
- Network tab for any failed resource loads

---

**Note**: This is a client-side only application. For production use with multiple users, consider implementing a backend server with a database.

