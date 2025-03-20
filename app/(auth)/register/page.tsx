// src/app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, User, Building, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [userType, setUserType] = useState<"FARMER" | "LENDER" | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (userType) {
      router.push(`/register/${userType.toLowerCase()}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-agri-50 to-fin-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-card">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-gray-900">
            Join AgriFinance
          </h1>
          <p className="mt-2 text-gray-600">
            Create an account to access financial services tailored for
            agriculture
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-700">I am a:</h2>
          <div className="mt-4 space-y-4">
            <button
              onClick={() => setUserType("FARMER")}
              className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all hover:border-agri-300 ${
                userType === "FARMER"
                  ? "border-agri-500 bg-agri-50 ring-2 ring-agri-200"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div className="rounded-full bg-agri-100 p-2">
                  <User className="h-5 w-5 text-agri-600" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-gray-900">Farmer</h3>
                  <p className="text-sm text-gray-500">
                    Access loans, manage farm operations, and sell produce
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`h-5 w-5 ${
                  userType === "FARMER" ? "text-agri-500" : "text-gray-400"
                }`}
              />
            </button>

            <button
              onClick={() => setUserType("LENDER")}
              className={`flex w-full items-center justify-between rounded-lg border p-4 transition-all hover:border-fin-300 ${
                userType === "LENDER"
                  ? "border-fin-500 bg-fin-50 ring-2 ring-fin-200"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div className="rounded-full bg-fin-100 p-2">
                  <Building className="h-5 w-5 text-fin-600" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-gray-900">Lender</h3>
                  <p className="text-sm text-gray-500">
                    Invest in agriculture, manage loan portfolios, and track
                    impact
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`h-5 w-5 ${
                  userType === "LENDER" ? "text-fin-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleContinue}
            disabled={!userType}
            className={`flex w-full items-center justify-center rounded-lg py-3 px-4 font-medium text-white transition-all ${
              userType
                ? userType === "FARMER"
                  ? "bg-agri-600 hover:bg-agri-700"
                  : "bg-fin-600 hover:bg-fin-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-agri-600 hover:text-agri-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
