# Deploy Your Restaurant Billing Website to Google Firebase

## Step 1: Install Firebase CLI

1. **Install Node.js** (if not already installed):
   - Download from: https://nodejs.org/
   - Install the LTS version

2. **Install Firebase CLI globally**:
   ```bash
   npm install -g firebase-tools
   ```

## Step 2: Login to Firebase

1. Open PowerShell/Command Prompt
2. Run:
   ```bash
   firebase login
   ```
3. This will open your browser - login with your Google account

## Step 3: Initialize Firebase Project

1. Navigate to your project folder:
   ```bash
   cd "C:\Users\Guru Devar\billing website"
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

3. Follow the prompts:
   - Select "Create a new project" or use existing
   - Project name: `restaurant-billing` (or your choice)
   - Public directory: `.` (current directory)
   - Single-page app: `Yes`
   - Overwrite index.html: `No` (we already have one)

## Step 4: Deploy to Firebase

1. Deploy your website:
   ```bash
   firebase deploy --only hosting
   ```

2. Your website will be live at:
   ```
   https://your-project-id.web.app
   ```
   or
   ```
   https://your-project-id.firebaseapp.com
   ```

## Alternative: Quick Deploy via Firebase Console

1. Go to: https://console.firebase.google.com/
2. Click "Add project" or select existing
3. Enable "Hosting" from the left menu
4. Click "Get started"
5. Follow the instructions to upload your files

## Alternative: Use GitHub Pages (Free & Easy)

1. Create a GitHub account: https://github.com
2. Create a new repository
3. Upload your files (index.html, styles.css, script.js, images/)
4. Go to Settings > Pages
5. Select main branch and save
6. Your site will be at: `https://yourusername.github.io/repository-name`

## Alternative: Use Netlify (Free & Easy)

1. Go to: https://www.netlify.com
2. Sign up with GitHub/Google
3. Drag and drop your project folder
4. Your site will be live instantly!

---

**Recommended**: Start with **Netlify** or **GitHub Pages** for the easiest deployment!

