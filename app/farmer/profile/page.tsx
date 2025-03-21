import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function getFarmerProfile(userId: string) {
  return await db.farmer.findUnique({
    where: { id: userId },
    include: {
      user: true,
      address: true,
      creditScore: true,
      farms: {
        include: {
          harvestRecords: true,
          plantingRecords: true,
        },
      },
      loanApplications: {
        orderBy: { applicationDate: "desc" },
        take: 5,
      },
    },
  });
}

export default async function FarmerProfilePage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const farmerProfile = await getFarmerProfile(session.user.id);

  if (!farmerProfile) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-fin-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold text-gray-900">
                {farmerProfile.user.name}
              </h1>
              <p className="text-fin-600">{farmerProfile.user.email}</p>
              {farmerProfile.address && (
                <p className="text-gray-600 mt-1">
                  {[
                    farmerProfile.address.city,
                    farmerProfile.address.state,
                    farmerProfile.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
            {farmerProfile.creditScore && (
              <div className="bg-agri-100 rounded-lg p-4">
                <p className="text-sm text-agri-700">Credit Score</p>
                <p className="text-2xl font-semibold text-agri-600">
                  {farmerProfile.creditScore.score}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Farm Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Farms Overview
            </h2>
            <div className="space-y-4">
              {farmerProfile.farms.map((farm) => (
                <div key={farm.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-medium text-gray-900">{farm.name}</h3>
                  <p className="text-sm text-gray-600">
                    {farm.size} {farm.sizeUnit}
                  </p>
                  <p className="text-sm text-gray-600">
                    {farm.plantingRecords.length} Active Crops
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Harvests */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Recent Harvests
            </h2>
            <div className="space-y-4">
              {farmerProfile.farms.flatMap((farm) =>
                farm.harvestRecords.slice(0, 3).map((harvest) => (
                  <div key={harvest.id} className="border-b pb-4 last:border-0">
                    <p className="font-medium text-gray-900">
                      {harvest.cropType}
                    </p>
                    <p className="text-sm text-gray-600">
                      {harvest.quantity} {harvest.quantityUnit}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(harvest.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Loan Applications */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Recent Loan Applications
            </h2>
            <div className="space-y-4">
              {farmerProfile.loanApplications.map((loan) => (
                <div key={loan.id} className="border-b pb-4 last:border-0">
                  <p className="font-medium text-gray-900">
                    {loan.currency} {loan.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{loan.purpose}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      loan.status === "APPROVED"
                        ? "bg-success/10 text-success"
                        : loan.status === "PENDING"
                        ? "bg-warning/10 text-warning"
                        : loan.status === "REJECTED"
                        ? "bg-error/10 text-error"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {loan.status}
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
