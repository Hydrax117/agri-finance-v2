// prisma/seed.ts

import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@agrifintech.com" },
    update: {},
    create: {
      email: "admin@agrifintech.com",
      password: adminPassword,
      name: "Admin User",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      admin: {
        create: {
          department: "Platform Administration",
          permissions: {
            users: true,
            loans: true,
            marketplace: true,
            insurance: true,
            analytics: true,
          },
        },
      },
    },
  });
  console.log("Created admin:", admin.email);

  // Create sample lender
  const lenderPassword = await hash("lender123", 10);
  const lender = await prisma.user.upsert({
    where: { email: "lender@agrifund.com" },
    update: {},
    create: {
      email: "lender@agrifund.com",
      password: lenderPassword,
      name: "AgriGrow Fund",
      role: Role.LENDER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      lender: {
        create: {
          organizationName: "AgriGrow Fund",
          organizationType: "Investment Fund",
          registrationNumber: "INV12345",
          taxId: "TXF987654",
          website: "https://agrigrowfund.com",
          address: {
            create: {
              street: "456 Finance Ave",
              city: "Capital City",
              state: "FinState",
              postalCode: "54321",
              country: "United States",
              latitude: 38.8951,
              longitude: -77.0364,
            },
          },
        },
      },
    },
  });
  console.log("Created lender:", lender.email);

  // Create sample loan offering
  const loanOffering = await prisma.loanOffering.create({
    data: {
      lenderId: lender.id,
      name: "Small Farm Development Loan",
      description:
        "Financing for small farms to expand operations or invest in new equipment",
      minAmount: 1000,
      maxAmount: 25000,
      interestRateMin: 5.5,
      interestRateMax: 8.5,
      termMin: 6,
      termMax: 36,
      eligibilityCriteria: {
        minFarmSize: 1, // hectares
        minFarmingExperience: 2, // years
        acceptedCrops: ["maize", "wheat", "rice", "vegetables"],
      },
      targetFarmerType: ["smallholder", "family farm"],
      targetCrops: ["maize", "wheat", "rice", "vegetables"],
      isActive: true,
    },
  });
  console.log("Created loan offering:", loanOffering.name);

  // Create sample farmer user
  const farmerPassword = await hash("farmer123", 10);
  const farmer = await prisma.user.upsert({
    where: { email: "farmer@example.com" },
    update: {},
    create: {
      email: "farmer@example.com",
      password: farmerPassword,
      name: "John Farmer",
      phone: "+1234567890",
      role: Role.FARMER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
      farmer: {
        create: {
          nationalId: "ID12345678",
          dateOfBirth: new Date("1980-05-15"),
          gender: "Male",
          address: {
            create: {
              street: "123 Farm Road",
              city: "Farmville",
              state: "Agristate",
              postalCode: "12345",
              country: "United States",
              latitude: 39.7392,
              longitude: -104.9903,
            },
          },
          creditScore: {
            create: {
              score: 720,
              scoreRange: "300-850",
              factors: {
                paymentHistory: "Good",
                lengthOfCreditHistory: "Medium",
                outstandingDebt: "Low",
              },
            },
          },
        },
      },
    },
  });
  console.log("Created farmer:", farmer.email);

  // Create sample farm
  const farm = await prisma.farm.create({
    data: {
      name: "Green Valley Farm",
      size: 8.5,
      sizeUnit: "hectares",
      farmerId: farmer.id,
      soilType: "Loam",
      ownership: "owned",
      certifications: ["Organic", "Sustainable"],
      address: {
        create: {
          street: "Rural Route 5",
          city: "Farmville",
          state: "Agristate",
          postalCode: "12345",
          country: "United States",
          latitude: 39.7452,
          longitude: -104.9922,
        },
      },
    },
  });
  console.log("Created farm:", farm.name);

  // Create planting record
  const planting = await prisma.plantingRecord.create({
    data: {
      farmId: farm.id,
      farmerId: farmer.id,
      cropType: "Maize",
      variety: "Sweet Corn XH-5",
      plotSize: 2.5,
      plantingDate: new Date("2024-03-15"),
      expectedHarvestDate: new Date("2024-07-15"),
      seedQuantity: 25,
      seedUnit: "kg",
      fertilizer: "Organic compost",
      pesticides: "Neem oil",
      irrigationMethod: "Drip irrigation",
      status: "ACTIVE",
    },
  });
  console.log("Created planting record for", planting.cropType);

  // Create soil analysis
  const soilAnalysis = await prisma.soilAnalysis.create({
    data: {
      farmId: farm.id,
      analysisDate: new Date("2024-02-20"),
      ph: 6.8,
      nitrogenContent: 45,
      phosphorusContent: 30,
      potassiumContent: 35,
      organicMatter: 5.2,
      texture: "Clay loam",
      moisture: 22.5,
      recommendations: "Add more organic matter to improve soil structure",
      labName: "AgriLab Testing Services",
      sampleLocation: {
        lat: 39.7452,
        lng: -104.9922,
      },
    },
  });
  console.log("Created soil analysis");

  // Create weather data
  const weatherData = await prisma.weatherData.create({
    data: {
      farmId: farm.id,
      date: new Date("2024-03-10"),
      temperature: 22.5,
      humidity: 65,
      rainfall: 5.2,
      windSpeed: 8.0,
      windDirection: "SW",
      solarRadiation: 850,
      soilMoisture: 28.3,
      dataSource: "WeatherAgri API",
    },
  });
  console.log("Created weather data");

  // Create a loan application
  const loanApplication = await prisma.loanApplication.create({
    data: {
      farmerId: farmer.id,
      amount: 15000,
      currency: "USD",
      purpose: "Purchase of drip irrigation system",
      term: 24, // months
      interestRate: 6.5,
      status: "PENDING",
      creditScoreId: (
        await prisma.creditScore.findFirst({
          where: { farmerId: farmer.id },
        })
      )?.id,
      collateral: "Farm equipment",
      loanOfferingId: loanOffering.id,
      notes: "Irrigation system to improve water efficiency",
    },
  });
  console.log("Created loan application for", loanApplication.purpose);

  // Create a marketplace listing
  const productListing = await prisma.productListing.create({
    data: {
      farmerId: farmer.id,
      productName: "Organic Sweet Corn",
      description:
        "Freshly harvested organic sweet corn, perfect for direct consumption",
      quantity: 500,
      quantityUnit: "kg",
      pricePerUnit: 2.5,
      currency: "USD",
      quality: "Premium",
      certifications: ["Organic"],
      availableFrom: new Date("2024-07-20"),
      availableTo: new Date("2024-08-20"),
      deliveryOptions: ["Pickup", "Local delivery"],
      pickupLocation: "Green Valley Farm, Rural Route 5, Farmville",
      status: "ACTIVE",
      images: {
        create: {
          url: "/images/products/sweet-corn.jpg",
          caption: "Fresh organic sweet corn",
          isPrimary: true,
        },
      },
    },
  });
  console.log("Created product listing for", productListing.productName);

  // Create insurance policy
  const insurancePolicy = await prisma.insurancePolicy.create({
    data: {
      farmerId: farmer.id,
      policyType: "CROP",
      policyNumber: "CROP-2024-089754",
      provider: "AgriInsure",
      coverageAmount: 30000,
      currency: "USD",
      premium: 1200,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2025-03-01"),
      coverageDetails: {
        crops: ["Maize", "Wheat"],
        risks: ["Drought", "Flood", "Pest"],
        deductible: 500,
      },
      status: "ACTIVE",
    },
  });
  console.log("Created insurance policy:", insurancePolicy.policyNumber);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
