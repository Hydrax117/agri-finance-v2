import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CalendarDays, Sprout, DollarSign, AlertTriangle } from "lucide-react";
import { LoanStatus } from "@prisma/client";

async function getFarmerDashboard(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      farmer: {
        include: {
          creditScore: true,
          farms: {
            include: {
              plantingRecords: {
                where: { status: "ACTIVE" },
                take: 5,
                orderBy: { plantingDate: "desc" },
              },
              harvestRecords: {
                take: 5,
                orderBy: { harvestDate: "desc" },
              },
            },
          },
          loanApplications: {
            take: 5,
            orderBy: { applicationDate: "desc" },
          },
          weatherAlerts: {
            where: { readStatus: false },
            take: 3,
            orderBy: { issueDate: "desc" },
          },
        },
      },
    },
  });

  return user?.farmer;
}

export default async function FarmerDashboard() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const farmerData = await getFarmerDashboard(session.user.id);

  if (!farmerData) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-fin-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Welcome back, {session.user.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Here is what is happening with your farms
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Active Crops
              </h3>
              <Sprout className="h-6 w-6 text-agri-600" />
            </div>
            <p className="text-3xl font-semibold text-agri-700">
              {farmerData.farms.reduce(
                (acc, farm) => acc + farm.plantingRecords.length,
                0
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Credit Score
              </h3>
              <DollarSign className="h-6 w-6 text-fin-600" />
            </div>
            <p className="text-3xl font-semibold text-fin-700">
              {farmerData.creditScore?.score || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Recent Harvests
              </h3>
              <CalendarDays className="h-6 w-6 text-harvest-500" />
            </div>
            <p className="text-3xl font-semibold text-harvest-700">
              {farmerData.farms.reduce(
                (acc, farm) => acc + farm.harvestRecords.length,
                0
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Active Loans
              </h3>
              <DollarSign className="h-6 w-6 text-soil-600" />
            </div>
            <p className="text-3xl font-semibold text-soil-700">
              {
                farmerData.loanApplications.filter(
                  (loan) =>
                    loan.status === LoanStatus.DISBURSED ||
                    loan.status === LoanStatus.REPAYING
                ).length
              }
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Plantings */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Active Plantings
            </h3>
            <div className="space-y-4">
              {farmerData.farms.flatMap((farm) =>
                farm.plantingRecords.map((planting) => (
                  <div
                    key={planting.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {planting.cropType}
                      </p>
                      <p className="text-sm text-gray-600">
                        {planting.plotSize} {planting.plotUnit}
                      </p>
                    </div>
                    <span className="text-sm text-agri-600">
                      {new Date(planting.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Harvests */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Recent Harvests
            </h3>
            <div className="space-y-4">
              {farmerData.farms.flatMap((farm) =>
                farm.harvestRecords.map((harvest) => (
                  <div
                    key={harvest.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {harvest.cropType}
                      </p>
                      <p className="text-sm text-gray-600">
                        {harvest.quantity} {harvest.quantityUnit}
                      </p>
                    </div>
                    <span className="text-sm text-harvest-600">
                      {new Date(harvest.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weather Alerts */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Weather Alerts
              </h3>
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div className="space-y-4">
              {farmerData.weatherAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-4 border-b pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {alert.alertType}
                    </p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === "HIGH"
                        ? "bg-error/10 text-error"
                        : alert.severity === "MEDIUM"
                        ? "bg-warning/10 text-warning"
                        : "bg-info/10 text-info"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
