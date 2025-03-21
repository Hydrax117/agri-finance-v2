// src/app/farmer/loans/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Botton";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/Card";

async function getLoanById(id: string) {
  // In a real app, this would fetch data from your API based on the ID
  const loans = {
    "1": {
      id: "1",
      amount: 5000,
      currency: "USD",
      purpose: "Crop expansion",
      term: 12,
      interestRate: 5.5,
      status: "REPAYING",
      applicationDate: new Date("2024-11-15"),
      approvalDate: new Date("2024-11-25"),
      disbursementDate: new Date("2024-12-01"),
      nextPaymentDate: new Date("2025-04-01"),
      nextPaymentAmount: 450,
      progress: 25,
      description:
        "Loan for expanding crop production area by 2 hectares, including land preparation and initial planting costs.",
      totalPaid: 1250,
      remainingBalance: 3950,
      loanOfficer: "Sarah Johnson",
      documents: [
        {
          name: "Loan Agreement",
          dateUploaded: new Date("2024-11-25"),
          type: "PDF",
        },
        {
          name: "Farm Assessment",
          dateUploaded: new Date("2024-11-20"),
          type: "PDF",
        },
        {
          name: "Land Title",
          dateUploaded: new Date("2024-11-15"),
          type: "Image",
        },
      ],
      repaymentSchedule: [
        { date: new Date("2025-01-01"), amount: 425, status: "PAID" },
        { date: new Date("2025-02-01"), amount: 425, status: "PAID" },
        { date: new Date("2025-03-01"), amount: 425, status: "PAID" },
        { date: new Date("2025-04-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-05-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-06-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-07-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-08-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-09-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-10-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-11-01"), amount: 425, status: "PENDING" },
        { date: new Date("2025-12-01"), amount: 425, status: "PENDING" },
      ],
    },
    "2": {
      id: "2",
      amount: 2500,
      currency: "USD",
      purpose: "Equipment repair",
      term: 6,
      interestRate: 4.5,
      status: "APPROVED",
      applicationDate: new Date("2025-02-10"),
      approvalDate: new Date("2025-03-05"),
      disbursementDate: null,
      nextPaymentDate: null,
      progress: 0,
      description:
        "Loan for repairing irrigation equipment damaged during the last storm season.",
      loanOfficer: "Michael Lee",
      documents: [
        {
          name: "Loan Approval",
          dateUploaded: new Date("2025-03-05"),
          type: "PDF",
        },
        {
          name: "Equipment Inspection",
          dateUploaded: new Date("2025-02-20"),
          type: "PDF",
        },
        {
          name: "Cost Estimate",
          dateUploaded: new Date("2025-02-10"),
          type: "PDF",
        },
      ],
    },
    "3": {
      id: "3",
      amount: 10000,
      currency: "USD",
      purpose: "Irrigation system",
      term: 24,
      interestRate: 6.0,
      status: "PENDING",
      applicationDate: new Date("2025-03-05"),
      approvalDate: null,
      disbursementDate: null,
      nextPaymentDate: null,
      progress: 0,
      description:
        "Loan for installing a new drip irrigation system to improve water efficiency and crop yields.",
      documents: [
        {
          name: "Irrigation Plan",
          dateUploaded: new Date("2025-03-05"),
          type: "PDF",
        },
        {
          name: "Supplier Quote",
          dateUploaded: new Date("2025-03-05"),
          type: "PDF",
        },
      ],
      reviewNotes:
        "Application is currently under review. Additional documentation may be requested regarding water access rights.",
    },
  };

  return loans[id as keyof typeof loans];
}

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
    case "PAID":
      return "bg-success text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default async function LoanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const loan = await getLoanById(id);

  if (!loan) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Loan Not Found</h1>
        <p className="mb-6">
          The loan youre looking for does not exist or you do not have access to
          it.
        </p>
        <Button>
          <Link href="/farmer/loans">Return to Loans</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link
          href="/farmer/loans"
          className="flex items-center text-fin-600 hover:text-fin-700"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to All Loans
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {loan.purpose}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Loan #{loan.id}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
              loan.status
            )}`}
          >
            {loan.status.replace("_", " ")}
          </span>
          {loan.status === "REPAYING" && (
            <Button className="bg-agri-600 hover:bg-agri-700 text-white">
              Make a Payment
            </Button>
          )}
          {loan.status === "APPROVED" && (
            <Button className="bg-fin-600 hover:bg-fin-700 text-white">
              View Disbursement Details
            </Button>
          )}
          {loan.status === "PENDING" && (
            <Button className="bg-fin-600 hover:bg-fin-700 text-white">
              Edit Application
            </Button>
          )}
        </div>
      </div>

      {/* Loan Summary Card */}
      <Card className="mb-8 shadow-card">
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
              <p className="font-medium text-lg">
                {loan.currency} {loan.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Interest Rate
              </p>
              <p className="font-medium text-lg">{loan.interestRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
              <p className="font-medium text-lg">{loan.term} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Application Date
              </p>
              <p className="font-medium text-lg">
                {loan.applicationDate.toLocaleDateString()}
              </p>
            </div>

            {loan.approvalDate && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Approval Date
                </p>
                <p className="font-medium text-lg">
                  {loan.approvalDate.toLocaleDateString()}
                </p>
              </div>
            )}

            {loan.disbursementDate && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Disbursement Date
                </p>
                <p className="font-medium text-lg">
                  {loan.disbursementDate.toLocaleDateString()}
                </p>
              </div>
            )}

            {loan.nextPaymentDate && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next Payment Date
                </p>
                <p className="font-medium text-lg">
                  {loan.nextPaymentDate.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {loan.description && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Description
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                {loan.description}
              </p>
            </div>
          )}

          {/* {loan.reviewNotes && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="font-medium text-amber-800 dark:text-amber-400 mb-1">Review Notes</p>
              <p className="text-amber-700 dark:text-amber-300">{loan.reviewNotes}</p>
            </div>
          )} */}

          {loan.status === "REPAYING" && (
            <div className="mt-6">
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
        </CardContent>
      </Card>

      {/* Repayment Schedule */}
      {/* {loan.repaymentSchedule && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Repayment Schedule</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-card">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loan.repaymentSchedule.map((payment, index) => (
                  <tr key={index} className={payment.status === "PAID" ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {payment.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {loan.currency} {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {payment.status === "PAID" ? "Bank Transfer" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}

      {/* Documents */}
      {loan.documents && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loan.documents.map((document, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{document.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {document.dateUploaded.toLocaleDateString()}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
