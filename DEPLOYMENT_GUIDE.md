# Deployment Guide - Fixing 404 Errors on Direct URL Access

## Problem
When deploying a React Single Page Application (SPA), directly accessing URLs like `/login` or `/profile` results in a 404 error. This happens because:
1. The server tries to find a file at that path instead of serving `index.html`
2. React Router handles routing client-side, but the server must serve the app first

## Solution
The server must be configured to serve `index.html` for all routes, allowing React Router to handle routing.

---

## Deployment Options

### 1. Docker Deployment (RECOMMENDED)

#### Build and Run
```bash
# Build the Docker image
docker build -t projectx-frontend .

# Run the container
docker run -p 3000:80 projectx-frontend
```

#### Using Docker Compose
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:3000`

**Features:**
- ✅ Nginx configured to handle all routes
- ✅ Gzip compression enabled
- ✅ Security headers configured
- ✅ Static asset caching
- ✅ Health check endpoint at `/health`

---

### 2. Vercel Deployment

#### Deploy via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Deploy via Git
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel will automatically use `vercel.json` configuration

**Configuration:** Uses [vercel.json](vercel.json) for rewrites

---

### 3. Netlify Deployment

#### Deploy via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Deploy via Git
1. Push code to GitHub
2. Import project in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

**Configuration:** Uses [netlify.toml](netlify.toml) and [public/_redirects](public/_redirects)

---

### 4. Other Static Hosts (GitHub Pages, Firebase, etc.)

For static hosting services, ensure the `public/_redirects` file is copied to the build output.

---

## How It Works

### Server Configuration
All deployment configurations implement the same principle:
```
Request /login → Server returns index.html → React Router handles /login
```

### Files Created
- **[nginx.conf](nginx.conf)** - Nginx server configuration for Docker
- **[Dockerfile](Dockerfile)** - Multi-stage Docker build
- **[docker-compose.yml](docker-compose.yml)** - Docker Compose setup
- **[vercel.json](vercel.json)** - Vercel configuration
- **[netlify.toml](netlify.toml)** - Netlify configuration
- **[public/_redirects](public/_redirects)** - Universal redirect rules

### Route Protection
Created route guards to validate all requests:
- **[ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)** - Validates authentication for protected routes
- **[PublicRoute.jsx](src/components/PublicRoute.jsx)** - Prevents authenticated users from accessing public routes

### Updated Files
- **[src/App.jsx](src/App.jsx)** - Restructured with proper route guards and validation

---

## Testing

### Test Direct URL Access
1. Build the application: `npm run build`
2. Start the server (Docker/Vercel/Netlify)
3. Navigate directly to: `http://your-domain/login`
4. Should see the login page (not 404)

### Test Protected Routes
1. Navigate to `/home` without logging in
2. Should redirect to `/login`
3. Log in successfully
4. Should redirect to `/home`
5. Try accessing `/login` while logged in
6. Should redirect to `/home`

---

## Environment Variables

Create a `.env` file for production:
```env
VITE_API_URL=https://your-api-domain.com
VITE_SOCKET_URL=https://your-socket-domain.com
```

Update the build command in your deployment platform to use environment variables.

---

## Troubleshooting

### Still Getting 404?
1. **Check server configuration**: Ensure the server is configured to serve `index.html` for all routes
2. **Check build output**: Verify `dist/index.html` exists after build
3. **Check base URL**: Ensure Vite base URL is configured correctly in `vite.config.js`
4. **Check deployment platform**: Different platforms require different configurations

### Routes Work Locally But Not in Production?
1. **Check server configuration**: Production server may need different configuration
2. **Check build**: Run `npm run build` and test the `dist` folder locally
3. **Check environment variables**: Ensure all environment variables are set in production

---

## Security Notes

The following security measures are implemented:
1. **Route Guards**: Authentication required for protected routes
2. **Token Validation**: Tokens are validated on each request
3. **Session Management**: Invalid sessions are cleared automatically
4. **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
5. **HTTPS**: Always use HTTPS in production

---

## Next Steps

1. Choose your deployment method
2. Set up environment variables
3. Deploy the application
4. Test all routes
5. Monitor for errors

For questions or issues, refer to the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Docker Docs](https://docs.docker.com)
