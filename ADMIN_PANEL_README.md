# 🎛️ D-Zone Solutions Admin Panel

Complete admin control panel for managing courses, users, tests, and more.

## 📋 Features

### Dashboard
- **Real-time Statistics**: View total users, courses, enrollments, tests, and more
- **Quick Actions**: Rapid access to common admin tasks
- **System Status**: Monitor API, database, and server health

### 👥 User Management
- **Create Users**: Add new students, instructors, or admins
- **Edit Users**: Update user information and roles
- **Delete Users**: Remove users from the system
- **View Details**: See user enrollments and test results

### 📚 Course Management
- **Create Courses**: Add new courses with details
- **Edit Courses**: Update course information
- **Delete Courses**: Remove courses and related data
- **Track Enrollment**: View student count per course

### ✅ Test Management
- **Create Tests**: Create tests for courses with modules
- **Edit Tests**: Update test information
- **Delete Tests**: Remove tests and related data
- **View Attempts**: Track student test attempts

### 📖 Module Management
- **View Modules**: See all course modules
- **Organize by Course**: Filter modules by course
- **Delete Modules**: Remove modules from the system

### ❓ Question Management
- **Create Questions**: Add MCQ questions to tests
- **Manage Options**: Configure question options and answers
- **Track Questions**: View all questions across tests

### 📋 Enrollment Management
- **View Enrollments**: See all student enrollments
- **Student Info**: View student and course details
- **Enrollment Date**: Track when students enrolled

### 🏆 Certificates (Coming Soon)
- Issue certificates to completing students
- Track pending and issued certificates

### 📝 Notes (Coming Soon)
- Manage course notes and study materials

### 📊 Analytics
- View system trends and usage patterns
- Track enrollment patterns
- Monitor course performance

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18 <25)
- npm or yarn

### Installation

1. **Install Dependencies** (already done):
```bash
npm install
```

2. **Set up Environment Variables**:
Create a `.env.local` file in the root directory:
```
DATABASE_URL="file:./dev.db"
```

3. **Run Database Migrations** (if needed):
```bash
npx prisma migrate dev
```

4. **Start Development Server**:
```bash
npm run dev
```

5. **Access Admin Panel**:
Open `http://localhost:3000/admin` in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx                 # Admin layout wrapper
│   │   ├── page.tsx                   # Dashboard
│   │   ├── users/
│   │   │   ├── page.tsx              # Users list
│   │   │   ├── create/page.tsx       # Create user
│   │   │   └── edit/[id]/page.tsx    # Edit user
│   │   ├── courses/
│   │   │   ├── page.tsx              # Courses list
│   │   │   ├── create/page.tsx       # Create course
│   │   │   └── edit/[id]/page.tsx    # Edit course
│   │   ├── tests/
│   │   │   ├── page.tsx              # Tests list
│   │   │   ├── create/page.tsx       # Create test
│   │   │   └── edit/[id]/page.tsx    # Edit test
│   │   ├── modules/page.tsx          # Modules list
│   │   ├── questions/page.tsx        # Questions list
│   │   ├── enrollments/page.tsx      # Enrollments list
│   │   ├── certificates/page.tsx     # Certificates management
│   │   ├── notes/page.tsx            # Notes management
│   │   └── analytics/page.tsx        # Analytics dashboard
│   └── api/
│       └── admin/
│           ├── stats/route.ts        # Dashboard stats
│           ├── users/
│           │   ├── route.ts          # User CRUD
│           │   └── [id]/route.ts     # Individual user
│           ├── courses/
│           │   ├── route.ts          # Course CRUD
│           │   └── [id]/route.ts     # Individual course
│           ├── tests/
│           │   ├── route.ts          # Test CRUD
│           │   └── [id]/route.ts     # Individual test
│           ├── modules/
│           │   ├── route.ts          # Module CRUD
│           │   └── [id]/route.ts     # Individual module
│           ├── questions/
│           │   ├── route.ts          # Question CRUD
│           │   └── [id]/route.ts     # Individual question
│           └── enrollments/route.ts  # Enrollment list
└── components/
    ├── AdminSidebar.tsx              # Sidebar navigation
    ├── AdminTopbar.tsx               # Top navigation
    ├── AdminTable.tsx                # Reusable table component
    ├── AdminForm.tsx                 # Reusable form component
    └── StatCard.tsx                  # Statistics card component
```

## 🎨 UI Components

### AdminSidebar
Collapsible sidebar with navigation to all admin pages.
```tsx
<AdminSidebar />
```

### AdminTopbar
Top navigation with page title and user menu.
```tsx
<AdminTopbar title="Page Title" />
```

### AdminTable
Reusable table component for displaying data with actions.
```tsx
<AdminTable
  columns={columns}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isLoading={loading}
/>
```

### AdminForm
Reusable form component for creating/editing items.
```tsx
<AdminForm
  title="Form Title"
  fields={formFields}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  submitText="Submit"
/>
```

### StatCard
Card component for displaying statistics.
```tsx
<StatCard
  title="Total Users"
  value={100}
  icon="👥"
  color="blue"
/>
```

## 🔌 API Routes

### Users
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create new user
- `GET /api/admin/users/[id]` - Get user details
- `PUT /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

### Courses
- `GET /api/admin/courses` - List all courses
- `POST /api/admin/courses` - Create new course
- `GET /api/admin/courses/[id]` - Get course details
- `PUT /api/admin/courses/[id]` - Update course
- `DELETE /api/admin/courses/[id]` - Delete course

### Tests
- `GET /api/admin/tests` - List all tests
- `POST /api/admin/tests` - Create new test
- `GET /api/admin/tests/[id]` - Get test details
- `PUT /api/admin/tests/[id]` - Update test
- `DELETE /api/admin/tests/[id]` - Delete test

### Modules
- `GET /api/admin/modules` - List all modules
- `POST /api/admin/modules` - Create new module
- `PUT /api/admin/modules/[id]` - Update module
- `DELETE /api/admin/modules/[id]` - Delete module

### Questions
- `GET /api/admin/questions` - List all questions
- `POST /api/admin/questions` - Create new question
- `PUT /api/admin/questions/[id]` - Update question
- `DELETE /api/admin/questions/[id]` - Delete question

### Dashboard
- `GET /api/admin/stats` - Get dashboard statistics

### Enrollments
- `GET /api/admin/enrollments` - List all enrollments

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **Role-based Access**: Users can have different roles (student, instructor, admin)
- **Data Validation**: All inputs are validated before processing

## 🎯 Usage Examples

### Creating a User
1. Navigate to **Users** in the sidebar
2. Click **Add New User** button
3. Fill in the form with user details
4. Select role (Student, Instructor, or Admin)
5. Click **Create User**

### Creating a Course
1. Navigate to **Courses** in the sidebar
2. Click **Add New Course** button
3. Enter course details
4. Upload course image (optional)
5. Click **Create Course**

### Adding a Test
1. Navigate to **Tests** in the sidebar
2. Click **Add New Test** button
3. Select the course
4. Enter test details
5. Click **Create Test**

### Managing Questions
1. After creating a test, navigate to **Questions**
2. View all questions for all tests
3. You can manage questions individually or in bulk

## 📊 Database Schema

The admin panel works with these main models:

- **User**: System users with roles (student, instructor, admin)
- **Course**: Course information and details
- **Module**: Course modules/chapters
- **Test**: Practice tests for courses
- **Question**: MCQ questions for tests
- **Enrollment**: Student enrollments in courses
- **TestResult**: Student test attempt results

## 🛠️ Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **SQLite** - Database (default)
- **bcryptjs** - Password hashing

## 📝 Notes

- All modifications are saved directly to the database
- Deleting items will cascade delete related data (enforced by Prisma)
- The admin panel uses client-side rendering for most pages
- API routes handle server-side data operations

## 🚀 Next Steps

1. **Add Authentication**: Implement login system and session management
2. **Role-based Access Control (RBAC)**: Restrict admin access to authenticated admins
3. **Certificates**: Complete certificate generation and management
4. **Notes Management**: Implement study notes management
5. **Analytics**: Add charts and detailed analytics
6. **Bulk Operations**: Add bulk edit/delete functionality
7. **Search & Filter**: Add advanced search and filtering

## 📞 Support

For issues or questions about the admin panel, please check:
1. The browser console for error messages
2. The network tab for API response errors
3. Database connection and migrations

## 📄 License

This admin panel is part of the D-Zone Solutions project.
