// src/app/(auth)/register/lender/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LenderRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationType: "",
    registrationNumber: "",
    taxId: "",
    website: "",
    country: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.organizationName) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!formData.organizationType) {
      newErrors.organizationType = "Organization type is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Here you would call your API to register the user
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     role: 'LENDER'
      //   })
      // });

      // if (!response.ok) throw new Error('Registration failed');

      // Mock successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to success page or onboarding
      router.push("/lender/profile");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        form: "Failed to register. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-fin-50 to-agri-50 p-4">
      <div className="mx-auto w-full max-w-2xl py-8">
        <Link
          href="/register"
          className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-fin-600"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to registration options
        </Link>

        <div className="rounded-xl bg-white p-8 shadow-card">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-gray-900">
              Create Lender Account
            </h1>
            <p className="mt-2 text-gray-600">
              Join our platform to invest in agriculture and manage your loan
              portfolio
            </p>
          </div>

          {errors.form && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Person Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm ${
                    errors.organizationName ? "border-red-500" : ""
                  }`}
                />
                {errors.organizationName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.organizationName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="organizationType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Type
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm ${
                    errors.organizationType ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Organization Type</option>
                  <option value="bank">Bank</option>
                  <option value="microfinance">Microfinance Institution</option>
                  <option value="credit_union">Credit Union</option>
                  <option value="impact_investor">Impact Investor</option>
                  <option value="ngo">NGO / Non-profit</option>
                  <option value="government">Government Agency</option>
                  <option value="fintech">Fintech Company</option>
                  <option value="other">Other</option>
                </select>
                {errors.organizationType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.organizationType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="taxId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tax ID
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm"
                  placeholder="https://"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fin-500 focus:ring-fin-500 sm:text-sm"
                >
                  <option value="">Select Country</option>
                  <option value="KE">Kenya</option>
                  <option value="TZ">Tanzania</option>
                  <option value="UG">Uganda</option>
                  <option value="RW">Rwanda</option>
                  <option value="ET">Ethiopia</option>
                  <option value="NG">Nigeria</option>
                  <option value="GH">Ghana</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="NL">Netherlands</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agri-500 focus:ring-agri-500 sm:text-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agri-500 focus:ring-agri-500 sm:text-sm ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`h-4 w-4 rounded border-gray-300 text-agri-600 focus:ring-agri-500 ${
                  errors.agreeToTerms ? "border-red-500" : ""
                }`}
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-agri-600 hover:text-agri-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-agri-600 hover:text-agri-700"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-agri-600 py-3 px-4 font-medium text-white transition-all hover:bg-agri-700 focus:outline-none focus:ring-2 focus:ring-agri-500 focus:ring-offset-2 disabled:bg-agri-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

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
    </div>
  );
}
