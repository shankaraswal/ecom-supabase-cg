import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
            🧁 Online Bakery Shop
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Fresh baked goods delivered to your doorstep
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to our bakery management system. Choose from the options below to explore our platform.
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Link
            href="/shop"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🛒
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Shop Items
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and order delicious bakery items
            </p>
          </Link>

          <Link
            href="/bakeries"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🏪
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Our Bakeries
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find bakery locations near you
            </p>
          </Link>

          <Link
            href="/admin"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              ⚙️
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Admin Panel
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage items and bakery locations
            </p>
          </Link>

          <Link
            href="/status"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              📊
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Dev Status
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track development progress
            </p>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            Why Choose Our Bakery?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Same-day delivery from the nearest bakery location
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🥖</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Fresh Daily
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                All items baked fresh daily with premium ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Multiple Locations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bakeries across different areas for convenient delivery
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">API Ready</div>
            <div className="text-blue-100">Backend Infrastructure Complete</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">Multi-Location</div>
            <div className="text-green-100">Pincode-based Delivery System</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">Modern UI</div>
            <div className="text-orange-100">Responsive Design & Dark Mode</div>
          </div>
        </div>
      </div>
    </div>
  );
}