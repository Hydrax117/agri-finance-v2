// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare, hash } from "bcryptjs";
import {
  getServerSession,
  type NextAuthOptions,
  type User as NextAuthUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedUser extends NextAuthUser {
  farmerId?: string;
  lenderId?: string;
  adminId?: string;
  role: "FARMER" | "LENDER" | "ADMIN";
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            farmer: true,
            lender: true,
            admin: true,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.status !== "ACTIVE") {
          throw new Error("Account is not active");
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          farmerId: user.farmer?.id,
          lenderId: user.lender?.id,
          adminId: user.admin?.id,
        } as ExtendedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.role = extendedUser.role as "FARMER" | "LENDER" | "ADMIN";
        token.farmerId = extendedUser.farmerId;
        token.lenderId = extendedUser.lenderId;
        token.adminId = extendedUser.adminId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as ExtendedUser).id = token.id as string;
        (session.user as ExtendedUser).role = token.role as
          | "FARMER"
          | "LENDER"
          | "ADMIN";
        (session.user as ExtendedUser).farmerId = token.farmerId as
          | string
          | undefined;
        (session.user as ExtendedUser).lenderId = token.lenderId as
          | string
          | undefined;
        (session.user as ExtendedUser).adminId = token.adminId as
          | string
          | undefined;
        (session.user as ExtendedUser).id = token.id as string;
        (session.user as ExtendedUser).role = token.role as
          | "FARMER"
          | "LENDER"
          | "ADMIN";
        (session.user as ExtendedUser).farmerId = token.farmerId as
          | string
          | undefined;
        (session.user as ExtendedUser).lenderId = token.lenderId as
          | string
          | undefined;
        (session.user as ExtendedUser).adminId = token.adminId as
          | string
          | undefined;
      }
      return session;
    },
  },
};

export const getSession = () => getServerSession(authOptions);

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

// Get the user's role from the session
export async function getUserRole() {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }
  return (session.user as ExtendedUser).role;
}

// Check if the user has a specific role
export async function hasRole(requiredRole: "FARMER" | "LENDER" | "ADMIN") {
  const session = await getSession();
  if (!session?.user) {
    return false;
  }
  return (session.user as ExtendedUser).role === requiredRole;
}

// Middleware to check user role
export function withRoleCheck(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  allowedRoles: ("FARMER" | "LENDER" | "ADMIN")[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession();

    if (!session?.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userRole = (session.user as ExtendedUser).role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    return handler(req, res);
  };
}
