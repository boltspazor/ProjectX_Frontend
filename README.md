# BaitHub Frontend

## Production Deployment

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

For local development:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Build for Production

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

### Development

```bash
npm run dev
```

### Linting

```bash
npm run lint
```