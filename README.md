# ProjectX Frontend

> **✅ INTEGRATION COMPLETE** - Fully connected to backend API  
> **✅ 404 FIX APPLIED** - Direct URL access now works on all platforms

## 🎯 Recent Updates

### Latest (404 Fix)
- ✅ **Fixed:** 404 errors on direct URL access (e.g., `/login`, `/profile`)
- ✅ **Added:** Route guards with authentication validation
- ✅ **Added:** Multiple deployment configurations (Docker, Vercel, Netlify)
- ✅ **Added:** Comprehensive documentation and testing tools

### Previous (Integration)
- ✅ Removed all mock API code
- ✅ Connected to real backend at `http://localhost:5001`
- ✅ Real-time features with Socket.IO
- ✅ Database persistence via MongoDB

## 📚 Documentation

- **[SOLUTION_SUMMARY.md](SOLUTION_SUMMARY.md)** - Complete 404 fix solution
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions
- **[FIX_SUMMARY.md](FIX_SUMMARY.md)** - Quick reference for the fix
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Visual diagrams and architecture
- **[VISUAL_GUIDE.txt](VISUAL_GUIDE.txt)** - ASCII flow diagrams

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or pnpm package manager
- Backend server running on port 5001

### Development
```bash
# Install dependencies
npm install

# Create .env file (or copy from .env.example)
echo "VITE_API_BASE_URL=http://localhost:5001" > .env
echo "VITE_SOCKET_URL=http://localhost:5001" >> .env

# Start development server
npm run dev
```

Frontend runs on **http://localhost:5173**

### Production Deployment

#### Option 1: Docker (Recommended)
```bash
npm run docker:up
# Access at http://localhost:3000
```

#### Option 2: Vercel
```bash
npm run deploy:vercel
```

#### Option 3: Netlify
```bash
npm run build
npm run deploy:netlify
```

## 🧪 Testing Deployment

```bash
./verify-deployment.sh https://your-app.com
```

## Test Accounts

Use these accounts to test (password: `password123`):
- **john@example.com** - Admin
- **alex@example.com** - Moderator  
- **sarah@example.com** - User

More accounts available in [TESTING_GUIDE.md](../TESTING_GUIDE.md)

## Features Ready to Test

### Core Features
- ✅ User authentication (login/register/logout)
- ✅ User profiles with avatars
- ✅ Feed with 25 posts1
VITE_SOCKET_URL=http://localhost:5001
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_SOCKET_URL=https://api.yourdomain.com
```

## 🎨 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Docker Deployment
npm run docker:build     # Build Docker image
npm run docker:run       # Run container
npm run docker:up        # Start with docker-compose
npm run docker:down      # Stop docker-compose

# Cloud Deployment
npm run deploy:vercel    # Deploy to Vercel
npm run deploy:netlify   # Deploy to Netlify
```

## ✨ Features

### Core Features
- ✅ Secure authentication with JWT and route guards
- ✅ Direct URL access works on all routes (no 404 errors)
- ✅ Protected routes require authentication
- ✅ Public routes redirect authenticated users
- ✅ Automatic session management and token validation

### Social Features
- ✅ User profiles with avatars
- ✅ Feed with posts, likes, and comments
- ✅ Follow/Unfollow users
- ✅ Communities (join, post, moderate)
- ✅ Real-time messaging
- ✅ Stories with 24h expiry
- ✅ Real-time notifications
- ✅ Search (users, posts, communities)

## 🔒 Security

- ✅ JWT token validation on every route
- ✅ Route guards for protected pages
- ✅ Automatic session cleanup
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ HTTPS enforcement in production
- ✅ CORS protection Stories with 24h expiry
- ✅ Notifications (real-time updates)
- ✅ Search (users, posts, communities)

## Environment Variables

### Development
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_SOCKET_URL=https://api.yourdomain.com
```

## Build for Production

```bash
npm install
npm run build
```

The production build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment

The `dist/` folder contains the production-ready static files. Deploy this folder to:
- Static hosting services (Vercel, Netlify, GitHub Pages)
- CDN services (Cloudflare, AWS CloudFront)
- Web servers (Nginx, Apache)

### Important Notes

1. **Environment Variables**: Make sure to set `VITE_API_BASE_URL` to your production backend URL before building.
2. **CORS**: Ensure your backend allows requests from your frontend domain.
3. **HTTPS**: Use HTTPS in production for secure API communication.
4. **Backend**: Backend must be running for the app to work.

## Development

```bash
npm run dev
```

### Linting

```bash
npm run lint
```