# Admin Authentication Setup Guide

This guide walks you through setting up the complete admin authentication system with Neon database.

## Prerequisites

- Node.js 18+
- npm or yarn
- A Neon database account (https://neon.tech)

## Step 1: Create Neon Database

1. Go to https://console.neon.tech
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@hostname/database?sslmode=require`)

## Step 2: Configure Environment Variables

Edit `.env.local` in the project root:

```bash
# Replace with your actual Neon connection string
DATABASE_URL="postgresql://user:password@hostname/database?sslmode=require"

# Generate a random secret (you can use the command below)
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET="your-generated-random-secret-here"

# Session expiry time (in hours)
SESSION_EXPIRY_HOURS=24

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Generating AUTH_SECRET

Run this command to generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Install Dependencies

```bash
npm install
```

Already installed:
- `@prisma/client` - Database ORM
- `prisma` - Database toolkit
- `bcryptjs` - Password hashing

## Step 4: Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (this will create all tables in Neon)
npx prisma migrate deploy

# Or if you want to apply pending migrations
npx prisma migrate dev --name init
```

## Step 5: Create Admin User

Run the admin creation script:

```bash
npx ts-node scripts/create-admin.ts
```

This creates:
- **Email:** admin@example.com
- **Password:** Admin@123
- **Role:** admin

### Or Create Manually

Use Prisma Studio:

```bash
npx prisma studio
```

1. Open the Users table
2. Create a new user with:
   - `email`: your-email@example.com
   - `name`: Your Name
   - `password`: Use bcryptjs to hash. Run:
     ```bash
     node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10).then(h => console.log(h));"
     ```
   - `role`: admin

## Step 6: Start Development Server

```bash
npm run dev
```

## Step 7: Access Admin Panel

1. Open http://localhost:3000/login
2. Login with:
   - **Email:** admin@example.com
   - **Password:** Admin@123
3. You'll be redirected to the admin dashboard at `/admin`

## Features

### ✅ Complete Authentication System

- **Secure Login** - Email and password authentication
- **JWT Sessions** - Secure token-based sessions stored in database
- **Protected Routes** - Middleware protects `/admin/*` routes
- **Password Hashing** - bcryptjs for secure password storage
- **Logout** - Session invalidation and cookie clearing
- **Admin-Only Access** - Only users with `role: "admin"` can access admin panel

### ✅ Security Features

- Secure HTTP-only cookies
- CSRF protection via SameSite cookies
- Password hashing with bcryptjs
- Session validation on every protected request
- Automatic session expiration
- Middleware-based route protection

### ✅ Database Schema

New tables created:

- `User` - User accounts with role-based access
  - `id`, `email`, `name`, `password`, `role`, `enrollments`, `testResults`, `sessions`
  
- `Session` - Active authentication sessions
  - `id`, `token`, `userId`, `expiresAt`, `createdAt`

## API Endpoints

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}

# Response:
{
  "success": true,
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Logout
```bash
POST /api/auth/logout

# Response:
{
  "success": true
}
```

## Troubleshooting

### "Invalid credentials" error
- Make sure you created the admin user with the script
- Check the email and password are correct
- Database must be connected and migrations run

### Cannot access `/admin` (redirects to `/login`)
- Check your auth token cookie is set
- Verify your database connection
- Run `npx prisma migrate deploy` to ensure tables exist

### Database connection error
- Verify DATABASE_URL in .env.local
- Check Neon project is active
- Ensure connection string includes `?sslmode=require`

### Prisma client errors
- Run `npx prisma generate` to regenerate client
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Development

### Create Additional Admin Users

```bash
# Using Prisma Studio
npx prisma studio

# Then manually add users with role: "admin"
```

### Reset Everything (Development Only)

```bash
# ⚠️ WARNING: This deletes all data!
npx prisma migrate reset

# Then run:
npx ts-node scripts/create-admin.ts
```

### View Database

```bash
# Open Prisma Studio
npx prisma studio
```

## Production Deployment

1. Set environment variables on your hosting platform
2. Run migrations before deploying:
   ```bash
   npx prisma migrate deploy
   ```
3. Ensure `AUTH_SECRET` is a strong, random value
4. Set `NODE_ENV=production`
5. Update `NEXT_PUBLIC_APP_URL` to your production domain

## Next Steps

- Customize login page styling
- Add password reset functionality
- Add two-factor authentication
- Set up role-based access control for other users
- Add activity logging
- Set up email notifications
