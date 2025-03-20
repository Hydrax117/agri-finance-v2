// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-agri-500 to-fin-500">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-agri-600 font-bold text-xl">AF</span>
            </div>
            <span className="text-white font-display text-xl font-bold">
              AgriFinance
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/farmer"
              className="text-white/90 hover:text-white transition-colors"
            >
              Farmers
            </Link>
            <Link
              href="/lender"
              className="text-white/90 hover:text-white transition-colors"
            >
              Lenders
            </Link>
            <Link
              href="/about"
              className="text-white/90 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white/90 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-white/90 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-white text-agri-600 hover:text-agri-700 rounded-md font-medium transition-colors shadow-button"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-agri-500/10 to-fin-500/5 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Empowering <span className="text-agri-600">Farmers</span> with{" "}
              <span className="text-fin-600">Financial</span> Solutions
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Access loans, manage your farm, and sell your products all in one
              platform designed for the modern farmer.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/farmer/register"
                className="px-6 py-3 bg-agri-500 hover:bg-agri-600 text-white rounded-lg font-semibold text-center transition-colors shadow-button"
              >
                Im a Farmer
              </Link>
              <Link
                href="/lender/register"
                className="px-6 py-3 bg-fin-500 hover:bg-fin-600 text-white rounded-lg font-semibold text-center transition-colors shadow-button"
              >
                Im a Lender
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-card">
              <Image
                src="/images/homepage-image.webp"
                alt="Farmer using mobile app in field"
                fill
                className="object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900 dark:text-white">
            Complete <span className="text-agri-600">Farm-to-Finance</span>{" "}
            Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className="w-12 h-12 bg-agri-100 dark:bg-agri-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-agri-600 dark:text-agri-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Simplified Loan Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Apply for loans with minimum paperwork and get faster approvals
                with our AI-powered credit assessment.
              </p>
              <Link
                href="/farmer/loans"
                className="text-agri-600 hover:text-agri-700 dark:text-agri-400 dark:hover:text-agri-300 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className="w-12 h-12 bg-fin-100 dark:bg-fin-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-fin-600 dark:text-fin-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Smart Farm Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage crops, track harvests, and monitor your farms financial
                performance with our intuitive tools.
              </p>
              <Link
                href="/farmer/farm-management"
                className="text-fin-600 hover:text-fin-700 dark:text-fin-400 dark:hover:text-fin-300 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className="w-12 h-12 bg-harvest-300/20 dark:bg-harvest-700/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-harvest-500 dark:text-harvest-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Direct Marketplace Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sell your produce directly to buyers at competitive prices and
                track market trends to maximize your profits.
              </p>
              <Link
                href="/farmer/marketplace"
                className="text-harvest-500 hover:text-harvest-600 dark:text-harvest-400 dark:hover:text-harvest-300 font-medium inline-flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Lenders Section */}
      <section className="py-16 bg-fin-50 dark:bg-fin-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white">
                For <span className="text-fin-600">Lenders</span> and{" "}
                <span className="text-fin-600">Investors</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Invest in agriculture with confidence using our advanced risk
                assessment tools and impact tracking features.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-fin-600 mr-2 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    AI-powered risk assessment and credit scoring
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-fin-600 mr-2 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Automated loan tracking and repayment management
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-fin-600 mr-2 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    Real-time impact metrics and ESG reporting
                  </span>
                </li>
              </ul>
              <Link
                href="/lender/register"
                className="px-6 py-3 bg-fin-600 hover:bg-fin-700 text-white rounded-lg font-semibold inline-block transition-colors shadow-button"
              >
                Become a Lender
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Loan Portfolio Performance
                  </h3>
                  <span className="text-sm text-fin-600 dark:text-fin-400 font-medium">
                    Last 12 months
                  </span>
                </div>
                <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-sm">
                    Chart placeholder
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Average Return
                    </p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      12.4%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Default Rate
                    </p>
                    <p className="text-xl font-semibold text-success">2.1%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Impact Score
                    </p>
                    <p className="text-xl font-semibold text-soil-500">
                      8.7/10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900 dark:text-white">
            Trusted by <span className="text-agri-600">Farmers</span> and{" "}
            <span className="text-fin-600">Lenders</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-agri-200 dark:bg-agri-800 rounded-full flex items-center justify-center mr-4">
                  <span className="text-agri-600 dark:text-agri-400 font-bold">
                    JD
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    John Doe
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Corn Farmer, Iowa
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                This platform has completely transformed how I manage my farm. I
                was able to secure financing during a critical planting season
                and increased my yield by 30% using their advisory services.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-fin-200 dark:bg-fin-800 rounded-full flex items-center justify-center mr-4">
                  <span className="text-fin-600 dark:text-fin-400 font-bold">
                    AS
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Amanda Smith
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Investment Manager, AgriGrowth Fund
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                The risk assessment tools have revolutionized our agricultural
                lending. We&apos;ve seen a 40% decrease in default rates while
                expanding our portfolio to smaller farms that traditionally
                struggled to access financing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-agri-600 to-fin-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Transform Your Agricultural Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of farmers and lenders already using our platform to
            grow their businesses sustainably.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-agri-600 hover:text-agri-700 rounded-lg font-semibold text-lg transition-colors shadow-button"
            >
              Get Started Today
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-colors"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-agri-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AF</span>
                </div>
                <span className="text-gray-900 dark:text-white font-display text-lg font-bold">
                  AgriFinance
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Empowering farmers with financial tools and agricultural
                expertise.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                For Farmers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/farmer/loans"
                    className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400"
                  >
                    Loans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/farm-management"
                    className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400"
                  >
                    Farm Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/marketplace"
                    className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/advisory"
                    className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400"
                  >
                    Advisory Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer/insurance"
                    className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400"
                  >
                    Insurance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                For Lenders
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/lender/marketplace"
                    className="text-gray-600 dark:text-gray-400 hover:text-fin-600 dark:hover:text-fin-400"
                  >
                    Loan Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lender/portfolio"
                    className="text-gray-600 dark:text-gray-400 hover:text-fin-600 dark:hover:text-fin-400"
                  >
                    Portfolio Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lender/risk-management"
                    className="text-gray-600 dark:text-gray-400 hover:text-fin-600 dark:hover:text-fin-400"
                  >
                    Risk Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lender/impact-investing"
                    className="text-gray-600 dark:text-gray-400 hover:text-fin-600 dark:hover:text-fin-400"
                  >
                    Impact Investing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lender/analytics"
                    className="text-gray-600 dark:text-gray-400 hover:text-fin-600 dark:hover:text-fin-400"
                  >
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 py-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 AgriFinance. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
