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

| Layer             | Technology                                |
| ----------------- | ----------------------------------------- |
| Frontend          | Next.js, React, Tailwind CSS, Shadcn/UI   |
| Backend (API)     | Node.js, Express.js                       |
| Database          | PostgreSQL / MongoDB (depending on setup) |
| ORM               | Prisma ORM                                |
| Authentication    | JWT / NextAuth                            |
| File Handling     | Cloudinary + Multer                       |
| PDF/Excel Exports | html2pdf.js, SheetJS                      |
| Deployment        | Vercel / Render / Railway                 |

---

## 📁 Folder Structure
