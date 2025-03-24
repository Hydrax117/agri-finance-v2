"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Botton";
import {
  Calendar,
  Map,
  Layers,
  FileText,
  Droplet,
  Info,
  Camera,
} from "lucide-react";

// Mock data based on the schema
const farmData = {
  id: "farm-123",
  name: "Green Valley Farm",
  size: 25.5,
  sizeUnit: "hectares",
  farmerId: "farmer-456",
  soilType: "Clay Loam",
  ownership: "owned",
  certifications: ["Organic", "Fair Trade"],
  address: {
    street: "Rural Route 42",
    city: "Farmington",
    state: "Agricultural State",
    postalCode: "12345",
    country: "United States",
    latitude: 39.742043,
    longitude: -105.123456,
  },
  createdAt: new Date("2023-05-15"),
  updatedAt: new Date("2024-01-20"),
};

const soilAnalysis = [
  {
    id: "soil-1",
    farmId: "farm-123",
    analysisDate: new Date("2024-01-10"),
    ph: 6.8,
    nitrogenContent: 42.3,
    phosphorusContent: 18.7,
    potassiumContent: 23.5,
    organicMatter: 3.2,
    texture: "Clay Loam",
    moisture: 34.6,
    recommendations:
      "Consider adding more nitrogen-rich fertilizer for the upcoming planting season.",
    labName: "AgriSoil Labs",
  },
  {
    id: "soil-2",
    farmId: "farm-123",
    analysisDate: new Date("2023-08-15"),
    ph: 6.5,
    nitrogenContent: 38.6,
    phosphorusContent: 16.9,
    potassiumContent: 22.1,
    organicMatter: 2.9,
    texture: "Clay Loam",
    moisture: 30.2,
    recommendations:
      "Soil health is good but could benefit from cover crops to improve organic matter.",
    labName: "AgriSoil Labs",
  },
];

const satelliteImages = [
  {
    id: "sat-1",
    farmId: "farm-123",
    captureDate: new Date("2024-02-15"),
    imageUrl: "/api/placeholder/400/300",
    ndviValue: 0.82,
    soilMoistureValue: 0.65,
    cropHealthIndex: 0.78,
    cloudCoverage: 0.05,
    resolution: "5m",
    provider: "AgriSat Imagery",
  },
  {
    id: "sat-2",
    farmId: "farm-123",
    captureDate: new Date("2023-11-20"),
    imageUrl: "/api/placeholder/400/300",
    ndviValue: 0.76,
    soilMoistureValue: 0.58,
    cropHealthIndex: 0.71,
    cloudCoverage: 0.12,
    resolution: "5m",
    provider: "AgriSat Imagery",
  },
];

const weatherData = [
  {
    id: "weather-1",
    farmId: "farm-123",
    date: new Date("2024-03-20"),
    temperature: 18.5,
    humidity: 65,
    rainfall: 12.3,
    windSpeed: 8.2,
    windDirection: "NW",
    solarRadiation: 852,
    soilMoisture: 32.5,
    dataSource: "Local Weather Station",
  },
  {
    id: "weather-2",
    farmId: "farm-123",
    date: new Date("2024-03-19"),
    temperature: 17.2,
    humidity: 72,
    rainfall: 0,
    windSpeed: 6.5,
    windDirection: "W",
    solarRadiation: 795,
    soilMoisture: 34.2,
    dataSource: "Local Weather Station",
  },
];

const FarmInformationManagement = () => {
  const [selectedSoilAnalysis, setSelectedSoilAnalysis] = useState(
    soilAnalysis[0]
  );

  // Function to format dates consistently
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100">
          {farmData.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Managing your farm data and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-agri-600" />
              <h3 className="font-medium">Farm Size</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {farmData.size} {farmData.sizeUnit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-agri-600" />
              <h3 className="font-medium">Soil Type</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{farmData.soilType}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-agri-600" />
              <h3 className="font-medium">Certifications</h3>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {farmData.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-agri-100 text-agri-800 rounded-md text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-agri-600" />
            <CardTitle>Farm Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Location Information
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Address:</span>
                  <span className="col-span-2">
                    {farmData.address.street}, {farmData.address.city}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Region:</span>
                  <span className="col-span-2">
                    {farmData.address.state}, {farmData.address.country}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Coordinates:</span>
                  <span className="col-span-2">
                    {farmData.address.latitude}, {farmData.address.longitude}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Farm Information
              </h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Ownership:</span>
                  <span className="col-span-2 capitalize">
                    {farmData.ownership}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Created:</span>
                  <span className="col-span-2">
                    {formatDate(farmData.createdAt)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Last updated:</span>
                  <span className="col-span-2">
                    {formatDate(farmData.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="soil">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="soil" className="flex items-center gap-2">
            <Droplet className="h-4 w-4" /> Soil Analysis
          </TabsTrigger>
          <TabsTrigger value="satellite" className="flex items-center gap-2">
            <Camera className="h-4 w-4" /> Satellite Imagery
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Weather Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="soil">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Soil Analyses</CardTitle>
                <CardDescription>
                  Select a soil test to view details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {soilAnalysis.map((analysis) => (
                    <div
                      key={analysis.id}
                      onClick={() => setSelectedSoilAnalysis(analysis)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedSoilAnalysis.id === analysis.id
                          ? "bg-agri-100 border-l-4 border-agri-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="font-medium">
                        {formatDate(analysis.analysisDate)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Lab: {analysis.labName}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  className="w-full bg-agri-600 hover:bg-agri-700"
                >
                  Request New Analysis
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Soil Analysis Results</CardTitle>
                <CardDescription>
                  Test Date: {formatDate(selectedSoilAnalysis.analysisDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Soil Composition
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>pH Level</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.ph}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-agri-500 h-2 rounded-full"
                            style={{
                              width: `${(selectedSoilAnalysis.ph / 14) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Nitrogen (N)</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.nitrogenContent} ppm
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-fin-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedSoilAnalysis.nitrogenContent / 60) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Phosphorus (P)</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.phosphorusContent} ppm
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-harvest-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedSoilAnalysis.phosphorusContent / 30) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Potassium (K)</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.potassiumContent} ppm
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-soil-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedSoilAnalysis.potassiumContent / 40) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Additional Metrics
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Organic Matter</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.organicMatter}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-agri-700 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedSoilAnalysis.organicMatter / 5) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {selectedSoilAnalysis.organicMatter < 2
                            ? "Low"
                            : selectedSoilAnalysis.organicMatter < 4
                            ? "Medium"
                            : "High"}{" "}
                          organic content
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Soil Moisture</span>
                          <span className="font-medium">
                            {selectedSoilAnalysis.moisture}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-fin-700 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedSoilAnalysis.moisture / 50) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Recommendations
                      </h3>
                      <div className="p-3 bg-agri-50 border-l-4 border-agri-500 rounded">
                        {selectedSoilAnalysis.recommendations}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Download Full Report</Button>
                <Button
                  variant="default"
                  className="bg-agri-600 hover:bg-agri-700"
                >
                  View Historical Trends
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satellite">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {satelliteImages.map((image) => (
              <Card key={image.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Satellite Image - {formatDate(image.captureDate)}
                  </CardTitle>
                  <CardDescription>Provider: {image.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-4 aspect-h-3 mb-4">
                    <img
                      src={image.imageUrl}
                      alt={`Satellite imagery from ${formatDate(
                        image.captureDate
                      )}`}
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">NDVI Value</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-agri-600 h-2 rounded-full"
                            style={{ width: `${image.ndviValue * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">
                          {image.ndviValue.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Crop Health</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-harvest-500 h-2 rounded-full"
                            style={{ width: `${image.cropHealthIndex * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">
                          {image.cropHealthIndex.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Soil Moisture</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-fin-600 h-2 rounded-full"
                            style={{
                              width: `${image.soilMoistureValue * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="font-medium">
                          {image.soilMoistureValue.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">
                        Cloud Coverage
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-gray-400 h-2 rounded-full"
                            style={{ width: `${image.cloudCoverage * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">
                          {(image.cloudCoverage * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="default"
                    className="w-full bg-agri-600 hover:bg-agri-700"
                  >
                    View Full Analysis
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="mr-4">
              View Historical Imagery
            </Button>
            <Button variant="default" className="bg-agri-600 hover:bg-agri-700">
              Request New Imagery
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Recent Weather Data</CardTitle>
              <CardDescription>
                Last 7 days of weather information for your farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 border-b">Date</th>
                      <th className="text-left py-2 px-3 border-b">
                        Temp (°C)
                      </th>
                      <th className="text-left py-2 px-3 border-b">
                        Humidity (%)
                      </th>
                      <th className="text-left py-2 px-3 border-b">
                        Rainfall (mm)
                      </th>
                      <th className="text-left py-2 px-3 border-b">Wind</th>
                      <th className="text-left py-2 px-3 border-b">
                        Soil Moisture (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.map((data) => (
                      <tr
                        key={data.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-2 px-3 border-b">
                          {formatDate(data.date)}
                        </td>
                        <td className="py-2 px-3 border-b">
                          {data.temperature.toFixed(1)}
                        </td>
                        <td className="py-2 px-3 border-b">
                          {data.humidity.toFixed(0)}
                        </td>
                        <td className="py-2 px-3 border-b">
                          {data.rainfall.toFixed(1)}
                        </td>
                        <td className="py-2 px-3 border-b">
                          {data.windSpeed.toFixed(1)} km/h {data.windDirection}
                        </td>
                        <td className="py-2 px-3 border-b">
                          {data.soilMoisture.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download Weather Data</Button>
              <Button
                variant="default"
                className="bg-agri-600 hover:bg-agri-700"
              >
                View Weather Forecast
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmInformationManagement;
