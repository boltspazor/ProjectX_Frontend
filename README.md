# ProjectX Frontend

> **✅ INTEGRATION COMPLETE** - All mock data removed, fully connected to backend API

## 🎉 What's New

- ✅ Removed all mock API code
- ✅ Connected to real backend at `http://localhost:5000`
- ✅ Real-time features with Socket.IO
- ✅ Database persistence via MongoDB
- ✅ Ready for end-to-end testing

See [INTEGRATION_COMPLETE.md](../INTEGRATION_COMPLETE.md) for full details.

## Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn package manager
- Backend server running on port 5000

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# Socket.IO URL (same as backend)
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend will run on **http://localhost:5173**

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
- ✅ Feed with 25 posts
- ✅ Like and comment on posts
- ✅ Follow/Unfollow users
- ✅ Create new posts

### Advanced Features  
- ✅ Communities (join, post, moderate)
- ✅ Real-time messaging (instant delivery)
- ✅ Stories with 24h expiry
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