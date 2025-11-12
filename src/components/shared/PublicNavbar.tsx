"use client";

import checkAuthStatus from "@/utility/auth";
import { IconUsers } from "@tabler/icons-react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const PublicNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await checkAuthStatus();
      setUser(user);
    };
    fetchUser();
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employees", label: "Employees", icon: Users },
    {
      href: "/dashboard/admin/add-employees",
      label: " Add Employees",
      icon: IconUsers,
    },
    {
      href: "/dashboard/admin/time-sheet",
      label: " Time Sheet",
      icon: IconUsers,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <UserCircle2 className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">EmployeeHub</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          {navItems.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: User info + logout */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <div className="flex items-center text-right">
                <div className="mr-2">
                  {/* <p className="text-sm font-semibold text-gray-900">
                    {user?.email || "Admin User"}
                  </p> */}
                  email
                  <p className="text-xs text-gray-500">ADMIN</p>
                </div>
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  {/* {user.name?.[0]?.toUpperCase() || "A"} */}
                  Name
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-red-600 flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-lg font-medium text-gray-700"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  {user ? (
                    <Button variant="destructive">Logout</Button>
                  ) : (
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Blue bottom border line */}
      <div className="h-[3px] bg-blue-600 w-full"></div>
    </header>
  );
};

export default PublicNavbar;
