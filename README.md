# 👨‍💼 Employees Managements UI

A **Full-Stack Employee Management System (UI)** built with **Next.js**, **React**, **Tailwind CSS**, and **Shadcn/UI**.  
This system allows administrators and managers to **add, edit, delete, and manage employees** with **role-based access control** and a responsive, modern interface.

---

## 🚀 Features

### 🧩 Core Features

- ➕ **Add New Employees** — Create new employee records with full details (name, department, ID, contact info, salary, etc.)
- ✏️ **Edit Employee Data** — Update any employee’s information instantly
- ❌ **Delete Employee** — Remove employees with confirmation prompt
- 👀 **View Employee List** — Sortable, searchable, and paginated table of all employees
- 🧾 **Export Options** — Download employee records as **PDF** or **Excel** files
- 📅 **Track Iqama / ID Expiry** — Automatically calculates remaining days and highlights expired ones

### 👤 User Role Management

- 👑 **Super Admin:** Full access (manage users, roles, and all data)
- 🧭 **Admin:** Manage employees and view analytics
- 👷 **User:** View only assigned employee data
- 🔒 **Role-Based Access Control (RBAC)** — Interface dynamically adapts based on user permissions

### 💻 Frontend Highlights

- Built with **Next.js 14+ (App Router + Turbopack)**
- Styled using **Tailwind CSS** and **Shadcn/UI**
- Fully **responsive** for desktop, tablet, and mobile
- Modern **dashboard layout** with reusable components
- **Dark mode** support
- **Persistent localStorage** for session-based data

---

## 🧠 Tech Stack

| Layer             | Technology                              |
| ----------------- | --------------------------------------- |
| Frontend          | Next.js, React, Tailwind CSS, Shadcn/UI |
| Backend (API)     | Node.js, Express.js                     |
| Database          | PostgreSQL / MongoDB                    |
| ORM               | Prisma ORM                              |
| Authentication    | JWT / NextAuth                          |
| File Handling     | Cloudinary + Multer                     |
| PDF/Excel Exports | html2pdf.js, SheetJS                    |
| Deployment        | Vercel / Render / Railway               |

---

## 📁 Folder Structure

```
employees-managements-ui/
├── src/
│   ├── app/
│   │   ├── (dashboardLayout)/
│   │   ├── (authLayout)/
│   │   ├── employees/
│   │   └── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── lib/
├── public/
├── package.json
├── prisma/
│   └── schema.prisma
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/employees-managements-ui.git
cd employees-managements-ui
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
DATABASE_URL=your_database_url
CLOUDINARY_URL=your_cloudinary_url
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Then open → [http://localhost:3000](http://localhost:3000)

---

## 🧪 Example User Roles

| Role            | Permissions                           |
| --------------- | ------------------------------------- |
| **Super Admin** | Add, Edit, Delete, View, Manage Roles |
| **Admin**       | Add, Edit, View                       |
| **User**        | View Only                             |

---

## 📦 API Endpoints (Sample)

| Method   | Endpoint             | Description          |
| -------- | -------------------- | -------------------- |
| `GET`    | `/api/employees`     | Fetch all employees  |
| `POST`   | `/api/employees`     | Add new employee     |
| `PUT`    | `/api/employees/:id` | Update employee info |
| `DELETE` | `/api/employees/:id` | Delete employee      |
| `POST`   | `/api/auth/login`    | User login           |
| `GET`    | `/api/users/roles`   | Fetch role list      |

---

## 🧰 Commands

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run lint`  | Run ESLint               |
| `npm run start` | Start production server  |

---

## 🧑‍💻 Developer Notes

- Uses **React Table** for dynamic employee list management
- **Form validation** handled by React Hook Form + Zod
- **Data persistence** handled via API + localStorage
- Includes **loading spinner**, **confirmation modals**, and **toast notifications**

---

## 🌐 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**, **Railway**, or **Heroku**
- Connected to **PostgreSQL** or **MongoDB Atlas**

---

## 🖼️ Screenshots

| Dashboard                                                   | Employee List                                        | Login Page                                    |
| ----------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| ![Dashboard Screenshot](./public/screenshots/dashboard.png) | ![Employee List](./public/screenshots/employees.png) | ![Login Page](./public/screenshots/login.png) |

_(Add your screenshots in `/public/screenshots/` folder to display them here.)_

---

## 🔗 Live Demo

👉 [Live Preview on Vercel](https://your-vercel-link.vercel.app)

---

## 🏁 Future Improvements

- ✅ Multi-language support (Arabic / English)
- ✅ Employee attendance tracking
- ✅ Email / Notification system
- ✅ Analytics dashboard for performance metrics

---

## 🧑‍💼 Author

**Mahabub Alam**  
🚀 Full-Stack Developer | Building efficient management systems  
🔗 [GitHub Profile](https://github.com/Mahabub2030)  
📧 Email: mahabubalam407557@gmail.com

---

## 📝 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---
