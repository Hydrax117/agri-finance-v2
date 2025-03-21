// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "FARMER" | "LENDER" | "ADMIN";
    farmerId?: string;
    lenderId?: string;
    adminId?: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: "FARMER" | "LENDER" | "ADMIN";
      farmerId?: string;
      lenderId?: string;
      adminId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "FARMER" | "LENDER" | "ADMIN";
    farmerId?: string;
    lenderId?: string;
    adminId?: string;
  }
}
