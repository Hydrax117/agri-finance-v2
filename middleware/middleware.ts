import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication with their allowed roles
const protectedRoutes = {
  "/farmer": ["FARMER"],
  "/farmer/profile": ["FARMER"],
  "/farmer/loans": ["FARMER"],
  "/farmer/farm-management": ["FARMER"],
  "/farmer/marketplace": ["FARMER"],
  "/farmer/advisory": ["FARMER"],
  "/farmer/insurance": ["FARMER"],
  "/farmer/equipment": ["FARMER"],

  "/lender": ["LENDER"],
  "/lender/profile": ["LENDER"],
  "/lender/marketplace": ["LENDER"],
  "/lender/portfolio": ["LENDER"],
  "/lender/risk-management": ["LENDER"],
  "/lender/impact-investing": ["LENDER"],
  "/lender/analytics": ["LENDER"],

  "/admin": ["ADMIN"],
  "/admin/loans": ["ADMIN"],
  "/admin/users": ["ADMIN"],
  "/admin/ai-model": ["ADMIN"],
  "/admin/marketplace-admin": ["ADMIN"],
  "/admin/advisory-admin": ["ADMIN"],
  "/admin/insurance-admin": ["ADMIN"],
  "/admin/analytics": ["ADMIN"],
  "/admin/system-health": ["ADMIN"],
};

// Auth paths that should redirect logged-in users away
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get user token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as string;

  // Handle auth routes (redirect to dashboard if already logged in)
  if (authRoutes.includes(path) && isAuthenticated) {
    // Redirect based on user role
    if (userRole === "FARMER") {
      return NextResponse.redirect(new URL("/farmer", request.url));
    } else if (userRole === "LENDER") {
      return NextResponse.redirect(new URL("/lender", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Check protected routes
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (path.startsWith(route)) {
      // Not authenticated, redirect to login
      if (!isAuthenticated) {
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, request.url)
        );
      }

      // Not authorized for this route
      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        if (userRole === "FARMER") {
          return NextResponse.redirect(new URL("/farmer", request.url));
        } else if (userRole === "LENDER") {
          return NextResponse.redirect(new URL("/lender", request.url));
        } else if (userRole === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for api routes, static files, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
