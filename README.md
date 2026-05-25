# Nice Academy - Full-Stack Next.js Website

A complete full-stack website for Nice Academy, a computer institute in Bilari offering courses in accounting, computer applications, and digital training.

## 🎯 Features

- ✅ **Homepage** - Hero section, stats, about, and popular courses
- ✅ **Courses Management** - Display all courses with API-driven data
- ✅ **Interactive Practice Tests** - Real-time MCQ tests with scoring and explanations
- ✅ **Certificate Verification** - Online certificate verification with API
- ✅ **Study Notes** - Comprehensive course notes and study materials
- ✅ **Contact Form** - Get in touch with the academy
- ✅ **About Page** - Academy information and team details
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **RESTful API** - Backend API routes for courses, tests, and certificates
- ✅ **Database Ready** - Prisma ORM with SQLite (easily switch to PostgreSQL)

## 🛠 Tech Stack

- **Frontend**: Next.js 16+ with TypeScript and React 19
- **Styling**: Tailwind CSS 4
- **Database**: SQLite with Prisma ORM
- **API**: RESTful API routes with sample data
- **State Management**: React hooks for interactive components

## 📁 Project Structure

```
nice-academy/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── courses/           # Courses page
│   │   ├── tests/             # Practice tests page
│   │   ├── notes/             # Study notes page
│   │   ├── contact/           # Contact page
│   │   ├── about/             # About page
│   │   ├── certificate/       # Certificate verification
│   │   ├── layout.tsx         # Root layout with nav & footer
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Step 1: Install Dependencies

> Recommended Node version: `Node 20.x` (or `Node 18.x`/`Node 22.x`). Next.js 16 and LightningCSS native bindings can fail on `Node 25+`.

```bash
cd c:\Users\anshs\OneDrive\Desktop\d-zone\ solutions\nice-academy
npm install
npm install @prisma/client prisma -D
```

> On Windows, the app uses Webpack mode and WASM lightningcss to avoid native-binding issues:

> ```bash
> npm run dev
> ```

### Step 2: Set Up Database

Initialize Prisma and create the database:

```bash
npx prisma migrate dev --name init
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📄 Available Pages

- **Home** - `/` - Main landing page with courses overview
- **Courses** - `/courses` - All courses listing with API-driven data
- **Practice Tests** - `/tests` - Interactive MCQ tests with real-time scoring
- **Study Notes** - `/notes` - Course study materials
- **About** - `/about` - About the academy and team
- **Contact** - `/contact` - Contact form and information
- **Certificate** - `/certificate` - Online certificate verification

## 🔌 API Endpoints

### Courses API
- `GET /api/courses` - Fetch all courses with modules and details

### Certificate Verification API
- `POST /api/certificate/verify` - Verify certificates by serial number, roll number, or verification code

### Practice Tests API
- `GET /api/tests?course={courseId}` - Get test questions for a specific course
- `POST /api/tests` - Submit test answers and get results with scoring

**Supported Course IDs for Tests:**
- `dfa` - Diploma in Financial Accounting
- `dca` - Diploma in Computer Applications
- `ccc` - Course on Computer Concepts

## 🗄 Database Models

The Prisma schema includes models for:
- **Course** - Course information and details
- **Module** - Course modules and chapters
- **Test** - Practice tests and MCQs
- **Question** - Individual test questions
- **Note** - Study materials and notes
- **Certificate** - Certificate verification
- **User** - Student and instructor profiles
- **Enrollment** - Course enrollments
- **TestResult** - Student test scores

## ⚙️ Environment Variables

Create `.env.local`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

## 🎨 Customization

### Change Database to PostgreSQL

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Update `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nice_academy"
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Set DATABASE_URL environment variable
2. Run `npm run build`
3. Deploy the `.next` folder

## 🔄 Future Enhancements

- User authentication and registration
- Student dashboard with course progress
- Online payment integration (Stripe)
- Video course hosting
- Instructor management dashboard
- Email notifications
- Advanced search and filtering
- Student forums/discussions
- PDF certificate generation

## 📞 Support

**Nice Academy Bilari**
- Email: info@niceacademy.com
- Location: Bilari, Moradabad, UP
- Experience: 15+ years in computer education

---

Built with ❤️ using Next.js and Tailwind CSS

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
