# 🎯 Deployment Checklist

Use this checklist when deploying your frontend application.

## Pre-Deployment

### Code Review
- [ ] All code changes committed to git
- [ ] No console.log or debug code in production
- [ ] Environment variables configured correctly
- [ ] API endpoints point to production backend
- [ ] Build completes without errors: `npm run build`
- [ ] No linting errors: `npm run lint`

### Environment Configuration
- [ ] `.env` file created with production values
- [ ] `VITE_API_BASE_URL` set to production backend URL
- [ ] `VITE_SOCKET_URL` set to production socket URL
- [ ] All required environment variables defined
- [ ] `.env` added to `.gitignore` (security)

### Security Check
- [ ] HTTPS enabled for production
- [ ] CORS configured correctly on backend
- [ ] Security headers configured (see nginx.conf)
- [ ] No sensitive data in frontend code
- [ ] Authentication tokens stored securely (localStorage)
- [ ] API keys not exposed in frontend code

## Deployment

### Choose Your Platform

#### Option A: Docker
- [ ] Docker and Docker Compose installed
- [ ] `nginx.conf` reviewed and customized if needed
- [ ] Build Docker image: `npm run docker:build`
- [ ] Start container: `npm run docker:up`
- [ ] Verify container running: `docker ps`
- [ ] Check logs: `docker-compose logs -f`

#### Option B: Vercel
- [ ] Vercel account created
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] `vercel.json` configuration reviewed
- [ ] Environment variables set in Vercel dashboard
- [ ] Deploy: `npm run deploy:vercel`
- [ ] Check deployment URL provided by Vercel

#### Option C: Netlify
- [ ] Netlify account created
- [ ] Netlify CLI installed: `npm install -g netlify-cli`
- [ ] `netlify.toml` and `public/_redirects` in place
- [ ] Environment variables set in Netlify dashboard
- [ ] Build: `npm run build`
- [ ] Deploy: `npm run deploy:netlify`
- [ ] Check deployment URL provided by Netlify

## Post-Deployment Testing

### Direct URL Access
- [ ] Test direct access to `/login` (should show login page, not 404)
- [ ] Test direct access to `/register` (should show register page)
- [ ] Test direct access to `/forgot-password` (should show page)
- [ ] Test direct access to `/home` while not logged in (should redirect to login)
- [ ] Test direct access to `/profile` while not logged in (should redirect to login)
- [ ] Test direct access to `/communities` while not logged in (should redirect to login)

### Authentication Flow
- [ ] Login with valid credentials works
- [ ] Login redirects to `/home` after success
- [ ] Invalid credentials show error message
- [ ] Registration form validates inputs
- [ ] Registration creates new account
- [ ] Forgot password sends email (if configured)
- [ ] Logout clears session and redirects to login

### Protected Routes
- [ ] Access `/home` while logged in shows home page
- [ ] Access `/profile` while logged in shows profile
- [ ] Access `/communities` while logged in shows communities
- [ ] Access `/messages` while logged in shows messages
- [ ] Logout from any page redirects to login
- [ ] Session persists after browser refresh

### Public Routes
- [ ] Access `/login` while logged in redirects to home
- [ ] Access `/register` while logged in redirects to home
- [ ] Access `/forgot-password` while logged in redirects to home

### Navigation
- [ ] All navigation links work correctly
- [ ] Browser back/forward buttons work
- [ ] Page refresh on any route works (no 404)
- [ ] Deep linking to specific pages works

### Static Assets
- [ ] All images load correctly
- [ ] All CSS styles applied correctly
- [ ] All JavaScript files load without errors
- [ ] Favicon displays correctly
- [ ] Fonts load properly

### Performance
- [ ] Page load time acceptable (< 3 seconds)
- [ ] Images optimized and load quickly
- [ ] No console errors in browser DevTools
- [ ] Mobile responsiveness works correctly
- [ ] Network tab shows no failed requests

### Security
- [ ] HTTPS certificate valid (production only)
- [ ] Security headers present (check browser DevTools)
- [ ] No mixed content warnings
- [ ] CORS errors not present
- [ ] Authentication tokens not visible in URL

### Real-time Features
- [ ] Socket.io connection established
- [ ] Real-time notifications work
- [ ] Real-time messaging works
- [ ] Socket reconnection works after network interruption

## Automated Testing

Run the verification script:
```bash
./verify-deployment.sh https://your-deployed-url.com
```

- [ ] All automated tests pass
- [ ] Health check endpoint responds (Docker only)
- [ ] Index.html served for all routes

## Monitoring

### Set Up Monitoring
- [ ] Error logging configured (Sentry, LogRocket, etc.)
- [ ] Analytics tracking configured (Google Analytics, etc.)
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] Performance monitoring configured

### Initial Monitoring Check
- [ ] No errors in error tracking system
- [ ] Analytics events firing correctly
- [ ] Uptime monitor shows site as up
- [ ] Performance metrics within acceptable range

## Documentation

- [ ] Deployment documented in team wiki/docs
- [ ] Environment variables documented
- [ ] Deployment URL shared with team
- [ ] Access credentials stored securely
- [ ] Rollback procedure documented

## Rollback Plan

If issues occur:
- [ ] Previous version/backup available
- [ ] Rollback procedure tested
- [ ] Database backup available (if applicable)
- [ ] Downtime window communicated to users

## Final Checks

- [ ] All tests passing
- [ ] No critical console errors
- [ ] No 404 errors on any route
- [ ] Authentication working end-to-end
- [ ] Real-time features working
- [ ] Mobile experience acceptable
- [ ] Performance acceptable
- [ ] Security measures in place

## Sign-Off

- [ ] Technical lead reviewed deployment
- [ ] Product owner approved
- [ ] Deployment documented
- [ ] Team notified of deployment
- [ ] Monitoring confirmed working

---

## Common Issues & Solutions

### Issue: 404 on Direct URL Access
**Solution:** Ensure server configuration serves index.html for all routes
- Docker: Check nginx.conf
- Vercel: Check vercel.json
- Netlify: Check netlify.toml and public/_redirects

### Issue: CORS Errors
**Solution:** Update backend CORS configuration to allow frontend domain

### Issue: Authentication Not Working
**Solution:** 
1. Check API URL in .env
2. Verify backend is accessible
3. Check network tab for failed requests
4. Verify token storage in localStorage

### Issue: Static Assets Not Loading
**Solution:**
1. Check build output in dist/ folder
2. Verify base URL in vite.config.js
3. Check network tab for 404s on assets

### Issue: Environment Variables Not Working
**Solution:**
1. Ensure variables start with VITE_
2. Rebuild after changing .env: `npm run build`
3. Verify variables in deployment platform settings

---

## Need Help?

See detailed documentation:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Comprehensive deployment guide
- [SOLUTION_SUMMARY.md](SOLUTION_SUMMARY.md) - Complete solution overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture and flow diagrams
- [FIX_SUMMARY.md](FIX_SUMMARY.md) - Quick fix reference
