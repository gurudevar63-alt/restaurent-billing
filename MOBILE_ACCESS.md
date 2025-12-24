# Access Website on Mobile - Quick Guide

## Option 1: Deploy Online (BEST - Works Anywhere)

### Quick Deploy with Netlify (2 minutes):

1. **Go to**: https://www.netlify.com
2. **Sign up** with Google (free)
3. **Drag and drop** your entire project folder
4. **Get instant URL** like: `your-site-name.netlify.app`
5. **Share this URL** - works on any device, anywhere!

### Quick Deploy with GitHub Pages:

1. **Create GitHub account**: https://github.com
2. **Create new repository**
3. **Upload all files** (index.html, styles.css, script.js, etc.)
4. **Go to Settings > Pages**
5. **Select main branch** and save
6. **Get URL**: `yourusername.github.io/repository-name`

---

## Option 2: Local Network Access (Same WiFi)

### Step 1: Start Local Server

**Windows:**
- Double-click `start-server.bat` file
- Or open PowerShell in project folder and run:
  ```bash
  python -m http.server 8000
  ```

**If Python not installed:**
```bash
npx http-server -p 8000
```

### Step 2: Find Your Computer's IP Address

**Windows:**
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" (usually 192.168.x.x)

**Or run this command:**
```bash
ipconfig | findstr IPv4
```

### Step 3: Access from Mobile

1. **Make sure mobile and computer are on same WiFi**
2. **Open mobile browser**
3. **Type**: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`
4. **Website will load on mobile!**

---

## Option 3: Use QR Code (Easiest)

1. Start local server (Option 2, Step 1)
2. Find your IP address (Option 2, Step 2)
3. Generate QR code with URL: `http://YOUR_IP:8000`
   - Use: https://www.qr-code-generator.com
4. Scan QR code with mobile
5. Website opens instantly!

---

## Quick Commands Reference

### Start Server:
```bash
python -m http.server 8000
```

### Find IP Address:
```bash
ipconfig | findstr IPv4
```

### Access URLs:
- **Computer**: http://localhost:8000
- **Mobile**: http://YOUR_IP:8000

---

## Recommended: Deploy Online

**Best option for mobile access:**
- ✅ Works anywhere (not just same WiFi)
- ✅ Shareable link
- ✅ No server setup needed
- ✅ Free hosting

**Use Netlify** - it's the fastest way!

