# Connection Troubleshooting Guide

## Problem: Mobile Can't Connect to Website

### Quick Fixes:

## 1. Check if Server is Running

**Windows:**
- Open PowerShell in project folder
- Run: `python -m http.server 8000`
- You should see: "Serving HTTP on 0.0.0.0 port 8000"

**If Python not installed:**
- Download: https://www.python.org/downloads/
- Install and check "Add to PATH"

## 2. Check Firewall Settings

**Windows Firewall might be blocking:**

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find Python or add new rule
4. Allow Python for Private networks

**Or temporarily disable firewall to test:**
- Settings > Windows Security > Firewall > Turn off (temporarily)

## 3. Verify IP Address

**Check your current IP:**
```bash
ipconfig | findstr IPv4
```

**Your IP might have changed!** Update the URL if different.

## 4. Ensure Same WiFi Network

- Computer and mobile MUST be on same WiFi
- Check WiFi name matches on both devices
- Try disconnecting and reconnecting mobile to WiFi

## 5. Try Alternative Methods

### Method A: Use 0.0.0.0 instead of IP
```bash
python -m http.server 8000 --bind 0.0.0.0
```

### Method B: Use localhost forwarding
- Install ngrok: https://ngrok.com
- Run: `ngrok http 8000`
- Get public URL that works anywhere

### Method C: Deploy Online (BEST SOLUTION)
- Go to https://www.netlify.com
- Drag and drop project folder
- Get instant URL that works everywhere

## 6. Test Connection

**On Computer:**
- Open: http://localhost:8000
- Should show your website

**On Mobile (same WiFi):**
- Open: http://YOUR_IP:8000
- Replace YOUR_IP with actual IP from ipconfig

## 7. Common Error Messages

**"Connection refused"**
- Server not running
- Start server: `python -m http.server 8000`

**"Can't reach this page"**
- Wrong IP address
- Check IP with: `ipconfig | findstr IPv4`
- Update URL

**"This site can't be reached"**
- Firewall blocking
- Check firewall settings
- Try disabling temporarily

**"Connection timeout"**
- Not on same WiFi
- Check WiFi network names match
- Try reconnecting mobile

## 8. Quick Test Commands

**Check server running:**
```bash
netstat -an | findstr :8000
```

**Check your IP:**
```bash
ipconfig | findstr IPv4
```

**Start server:**
```bash
python -m http.server 8000
```

## 9. Recommended Solution

**Deploy to Netlify (Easiest):**
1. Go to https://www.netlify.com
2. Sign up (free)
3. Drag project folder
4. Get URL instantly
5. Works on any device, anywhere!

No server setup, no firewall issues, no WiFi restrictions!

