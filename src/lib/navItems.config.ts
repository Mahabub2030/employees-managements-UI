import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["HRADMIN", "SUPERADMIN", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["HRADMIN", "SUPERADMIN", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["SUPERADMIN"],
        },
      ],
    },
  ];
};

export const hradminNavItems: NavSection[] = [
  {
    title: "Emolyee managments Management",
    items: [
      {
        title: "Appointments",
        href: "/hradmin/dashboard/vacation",
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: ["HRADMIN"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/my-schedules",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

// superadmin

export const superadminNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-task",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Book vacation",
        href: "/consultation",
        icon: "ClipboardList", // ✅ String
        roles: ["HRADMIN"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity", // ✅ String
        roles: ["HRADMIN"],
      },
    ],
  },
];
// admin
export const adminNavItems: NavSection[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Admins",
        href: "/dashboard/admin",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Employees",
        href: "/employees",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Add-Employee",
        href: "/add-employee",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Employees Management",
    items: [
      {
        title: "ID Valedation",
        href: "/id",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Time Sheet",
        href: "/timesheet",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Task",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "SUPERADMIN":
      return [...commonNavItems, ...superadminNavItems];
    case "HRADMIN":
      return [...commonNavItems, ...hradminNavItems];
    default:
      return [];
  }
};
