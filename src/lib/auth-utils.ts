export type UserRole = "ADMIN" | "SUPERADMIN" | "HRADMIN";

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const superadminProtectedRoutes: RouteConfig = {
  patterns: [/^\/superadmin/], // Routes starting with /doctor/* , /assitants, /appointments/*
  exact: [], // "/assistants"
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/], // Routes starting with /admin/*
  exact: [], // "/admins"
};

export const hradminProtectedRoutes: RouteConfig = {
  patterns: [/^\/hradmin/], // Routes starting with /dashboard/*
  exact: [], // "/dashboard"
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
  // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "SUPERADMIN" | "HRADMIN" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, superadminProtectedRoutes)) {
    return "SUPERADMIN";
  }
  if (isRouteMatches(pathname, hradminProtectedRoutes)) {
    return "HRADMIN";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "SUPERADMIN") {
    return "dashboard/superadmin";
  }
  if (role === "HRADMIN") {
    return "dashboard/hradmin";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
