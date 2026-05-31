# ⚠️ Database Connection Issue - FIX STEPS

Your Neon database is not accessible. Follow these steps:

## Step 1: Check Your Neon Project
1. Go to https://console.neon.tech
2. Click on your project: `ep-fancy-shadow-abwgyipn-pooler.eu-west-2.aws.neon.tech`
3. Make sure the project is **ACTIVE** (not suspended)
4. If suspended, click "Resume" button

## Step 2: Verify Connection String
1. In Neon Console, go to "Connection string"
2. Make sure it starts with: `postgresql://`
3. Copy the full connection string
4. Update `.env` and `.env.local` with the correct string

## Step 3: Test Connection
Run this command to test the connection:
```bash
npx prisma db push
```

## Step 4: If Still Not Working
- Check your internet connection
- Try a VPN if there are regional restrictions
- Contact Neon support if the database is deleted

---

**Alternative: Use Local SQLite (For Development Only)**

If you want to test locally without Neon:

1. Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Run migrations:
```bash
npx prisma migrate dev --name init
```

3. Create admin user:
```bash
npx ts-node scripts/create-admin.ts
```

Then come back to Neon later for production.
