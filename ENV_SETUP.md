# Environment Variables Setup for Admin Auth Security

## Required Environment Variables

### .env.local (Development)
```env
# Authentication Secret - Generate a secure random string
AUTH_SECRET=your-secure-random-secret-here

# Database URL
DATABASE_URL=your-database-connection-string

# Node Environment
NODE_ENV=development
```

### Generate Secure AUTH_SECRET

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -hex 32
```

**Option 3: Using Python**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Example .env.local
```env
AUTH_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
DATABASE_URL=postgresql://user:password@localhost:5432/dzone_db
NODE_ENV=development
```

## Production Environment Variables

### .env.production (or deployment platform settings)
```env
AUTH_SECRET=your-production-secret-here
DATABASE_URL=your-production-database-url
NODE_ENV=production

# Enable HTTPS only (automatic with secure: true in cookies)
# SESSION_TIMEOUT_HOURS=24
```

## Verifying Setup

### Test Auth Configuration
```bash
# Verify environment variables are loaded
npm run build

# Check for any environment-related errors
npm run dev
```

### Test Login Functionality
1. Start the application: `npm run dev`
2. Visit: http://localhost:3000/login
3. Use demo credentials:
   - Email: `admin@example.com`
   - Password: `Admin@123`
4. Should redirect to `/admin` dashboard

### Test Admin Protection
1. Without login, try: http://localhost:3000/admin
2. Should redirect to `/login`
3. After logout, trying to access `/admin` should redirect

## Security Checklist

- [ ] AUTH_SECRET is generated and set in .env.local
- [ ] .env.local is added to .gitignore (never commit secrets!)
- [ ] DATABASE_URL is configured correctly
- [ ] NODE_ENV is set to 'production' for production deployments
- [ ] HTTPS is enabled in production
- [ ] Admin user exists in database
- [ ] Cookie settings are secure (httpOnly, secure in production)
- [ ] Auth token tests pass

## Deployment Notes

### For Vercel
Set environment variables in Project Settings > Environment Variables:
- AUTH_SECRET
- DATABASE_URL
- NODE_ENV=production

### For Other Platforms
Follow platform-specific environment variable documentation.

### For Docker
```dockerfile
ENV AUTH_SECRET=${AUTH_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production
```

## Troubleshooting

### Issue: Login page shows "Login failed"
- Check AUTH_SECRET is set correctly
- Verify admin@example.com user exists in database
- Check database connection in DATABASE_URL

### Issue: After login, redirects back to /login
- Clear browser cookies
- Check if AUTH_SECRET changed (invalidates all tokens)
- Verify token expiration settings

### Issue: 401 Unauthorized on admin routes
- Verify AUTH_SECRET matches between client and server
- Check if NODE_ENV is set correctly
- Ensure auth-token cookie is being set

## Next Steps

1. Update admin@example.com password from default
2. Create additional admin users as needed
3. Set up password reset functionality
4. Implement audit logging for admin actions
5. Set up two-factor authentication (optional)
