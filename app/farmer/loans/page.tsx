// src/app/farmer/loans/page.tsx
import React from "react";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Botton";

async function getFarmerLoans() {
  // In a real app, this would fetch data from your API
  // For now, we'll use mock data based on your Prisma schema
  const loans = [
    {
      id: "1",
      amount: 5000,
      currency: "USD",
      purpose: "Crop expansion",
      term: 12,
      interestRate: 5.5,
      status: "REPAYING",
      applicationDate: new Date("2024-11-15"),
      disbursementDate: new Date("2024-12-01"),
      nextPaymentDate: new Date("2025-04-01"),
      progress: 25,
    },
    {
      id: "2",
      amount: 2500,
      currency: "USD",
      purpose: "Equipment repair",
      term: 6,
      interestRate: 4.5,
      status: "APPROVED",
      applicationDate: new Date("2025-02-10"),
      disbursementDate: null,
      nextPaymentDate: null,
      progress: 0,
    },
    {
      id: "3",
      amount: 10000,
      currency: "USD",
      purpose: "Irrigation system",
      term: 24,
      interestRate: 6.0,
      status: "PENDING",
      applicationDate: new Date("2025-03-05"),
      disbursementDate: null,
      nextPaymentDate: null,
      progress: 0,
    },
  ];

  return loans;
}

export default async function FarmerLoansPage() {
  const loans = await getFarmerLoans();

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-success text-white";
      case "PENDING":
        return "bg-warning text-white";
      case "UNDER_REVIEW":
        return "bg-info text-white";
      case "REJECTED":
        return "bg-error text-white";
      case "DISBURSED":
        return "bg-fin-500 text-white";
      case "REPAYING":
        return "bg-agri-500 text-white";
      case "COMPLETED":
        return "bg-green-700 text-white";
      case "DEFAULTED":
        return "bg-red-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            My Loans
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your loan applications and repayments
          </p>
        </div>
        <Button className="bg-fin-600 hover:bg-fin-700 text-white">
          <Link href="/farmer/loans/apply">Apply for a Loan</Link>
        </Button>
      </div>

      {/* Loan Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Active Loans</CardDescription>
            <CardTitle className="text-2xl">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Amount: $5,000
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Pending Approval</CardDescription>
            <CardTitle className="text-2xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Amount: $12,500
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Payment</CardDescription>
            <CardTitle className="text-2xl">April 1, 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Amount Due: $450
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Credit Score</CardDescription>
            <CardTitle className="text-2xl">725</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-fin-500 h-2.5 rounded-full"
                  style={{ width: "72.5%" }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                Good
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Applications List */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Your Loan Applications
      </h2>

      {loans.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            You dont have any loan applications yet.
          </p>
          <Button className="mt-4 bg-fin-600 hover:bg-fin-700 text-white">
            <Link href="/farmer/loans/apply">Apply for your first loan</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {loans.map((loan) => (
            <Link href={`/farmer/loans/${loan.id}`} key={loan.id}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-all cursor-pointer border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {loan.purpose}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Applied on {loan.applicationDate.toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        loan.status
                      )}`}
                    >
                      {loan.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Amount
                      </p>
                      <p className="font-medium">
                        {loan.currency} {loan.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Term
                      </p>
                      <p className="font-medium">{loan.term} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Interest Rate
                      </p>
                      <p className="font-medium">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Next Payment
                      </p>
                      <p className="font-medium">
                        {loan.nextPaymentDate
                          ? loan.nextPaymentDate.toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {loan.status === "REPAYING" && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Repayment Progress</span>
                        <span>{loan.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-agri-500 h-2.5 rounded-full"
                          style={{ width: `${loan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {loan.status === "REPAYING"
                      ? "Make a payment"
                      : "View details"}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Loan Recommendations */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Recommended Loan Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle>Crop Financing</CardTitle>
              <CardDescription>
                Ideal for seasonal planting costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Interest Rate
                  </span>
                  <span className="font-medium">4.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Term Range
                  </span>
                  <span className="font-medium">6-12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount Range
                  </span>
                  <span className="font-medium">$1,000 - $10,000</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-fin-600 hover:bg-fin-700 text-white">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle>Equipment Financing</CardTitle>
              <CardDescription>
                For machinery and tools purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Interest Rate
                  </span>
                  <span className="font-medium">5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Term Range
                  </span>
                  <span className="font-medium">12-36 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount Range
                  </span>
                  <span className="font-medium">$5,000 - $50,000</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-fin-600 hover:bg-fin-700 text-white">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle>Farm Expansion</CardTitle>
              <CardDescription>
                For land purchases or major improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Interest Rate
                  </span>
                  <span className="font-medium">6.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Term Range
                  </span>
                  <span className="font-medium">36-60 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount Range
                  </span>
                  <span className="font-medium">$25,000 - $100,000</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-fin-600 hover:bg-fin-700 text-white">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
