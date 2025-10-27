'use client';

import { useState } from 'react';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: 'backend' | 'items' | 'bakeries' | 'dev' | 'user' | 'frontend' | 'routing' | 'ecommerce' | 'auth' | 'payment' | 'advanced' | 'admin' | 'mobile' | 'integration';
}

const tasks: Task[] = [
    // Completed Features - Backend Infrastructure
    { id: 'db-setup', title: 'Database Setup', description: 'PostgreSQL with Drizzle ORM integration', completed: true, category: 'backend' },
    { id: 'db-schema', title: 'Database Schema', description: 'Users, Items, and Bakeries tables with proper relationships', completed: true, category: 'backend' },
    { id: 'db-migrations', title: 'Database Migrations', description: 'Automated migration system with drizzle-kit', completed: true, category: 'backend' },
    { id: 'type-safety', title: 'Type Safety', description: 'Full TypeScript implementation throughout the project', completed: true, category: 'backend' },
    { id: 'input-validation', title: 'Input Validation', description: 'Zod schemas for all API endpoints', completed: true, category: 'backend' },

    // Items Management API
    { id: 'get-items', title: 'GET /api/items', description: 'Retrieve all bakery items (public endpoint)', completed: true, category: 'items' },
    { id: 'post-items', title: 'POST /api/items', description: 'Add new bakery items with image upload', completed: true, category: 'items' },
    { id: 'get-item-id', title: 'GET /api/items/[id]', description: 'Get specific item by ID', completed: true, category: 'items' },
    { id: 'put-items', title: 'PUT /api/items/[id]', description: 'Update existing items with image replacement', completed: true, category: 'items' },
    { id: 'delete-items', title: 'DELETE /api/items/[id]', description: 'Delete items with automatic image cleanup', completed: true, category: 'items' },
    { id: 'image-upload', title: 'Image Upload', description: 'File handling and storage in /public/assets/', completed: true, category: 'items' },
    { id: 'image-management', title: 'Image Management', description: 'Update and delete images with proper cleanup', completed: true, category: 'items' },
    { id: 'item-validation', title: 'Item Validation', description: 'Name, description, price, and image validation', completed: true, category: 'items' },

    // Bakeries Management API
    { id: 'get-bakeries', title: 'GET /api/bakeries', description: 'Retrieve all bakery locations (public endpoint)', completed: true, category: 'bakeries' },
    { id: 'post-bakeries', title: 'POST /api/bakeries', description: 'Add new bakery locations', completed: true, category: 'bakeries' },
    { id: 'get-bakery-id', title: 'GET /api/bakeries/[id]', description: 'Get specific bakery by ID', completed: true, category: 'bakeries' },
    { id: 'put-bakeries', title: 'PUT /api/bakeries/[id]', description: 'Update existing bakery details', completed: true, category: 'bakeries' },
    { id: 'delete-bakery', title: 'DELETE /api/bakeries/[id]', description: 'Remove bakery locations', completed: true, category: 'bakeries' },
    { id: 'pincode-indexing', title: 'Pincode Indexing', description: 'Optimized database queries for location-based delivery', completed: true, category: 'bakeries' },

    // Development Infrastructure
    { id: 'nextjs-setup', title: 'Next.js 16 Setup', description: 'Modern React 19 with App Router', completed: true, category: 'dev' },
    { id: 'tailwind-css', title: 'Tailwind CSS', description: 'Styling framework integration', completed: true, category: 'dev' },
    { id: 'eslint-config', title: 'ESLint Configuration', description: 'Code quality and consistency', completed: true, category: 'dev' },
    { id: 'env-config', title: 'Environment Configuration', description: 'Database connection and environment variables', completed: true, category: 'dev' },
    { id: 'build-scripts', title: 'Build Scripts', description: 'Development, production, and database management scripts', completed: true, category: 'dev' },

    // Partially Implemented - User Management
    { id: 'user-schema', title: 'User Schema', description: 'Database table with authentication fields ready', completed: true, category: 'user' },
    { id: 'user-registration', title: 'User Registration/Login', description: 'Authentication system not implemented', completed: false, category: 'user' },
    { id: 'role-access', title: 'Role-based Access', description: 'Admin/customer role enforcement not active', completed: false, category: 'user' },
    { id: 'user-profile', title: 'User Profile Management', description: 'CRUD operations for user accounts', completed: false, category: 'user' },

    // Frontend Interface
    { id: 'nextjs-basic', title: 'Basic Next.js Setup', description: 'Project structure and routing ready', completed: true, category: 'frontend' },
    { id: 'home-page', title: 'Landing Page', description: 'Beautiful home page with navigation cards', completed: true, category: 'frontend' },
    { id: 'navigation', title: 'Navigation System', description: 'Sticky navigation with active page highlighting', completed: true, category: 'frontend' },
    { id: 'item-catalog-ui', title: 'Item Catalog UI', description: 'Browse and display bakery items with search/filter', completed: true, category: 'frontend' },
    { id: 'bakery-locations-ui', title: 'Bakery Locations UI', description: 'View bakery locations with search by pincode', completed: true, category: 'frontend' },
    { id: 'admin-dashboard', title: 'Admin Dashboard', description: 'Complete management interface for items and bakeries', completed: true, category: 'frontend' },
    { id: 'item-forms', title: 'Item Management Forms', description: 'Create and edit item forms with image upload', completed: true, category: 'frontend' },
    { id: 'bakery-forms', title: 'Bakery Management Forms', description: 'Create and edit bakery location forms', completed: true, category: 'frontend' },
    { id: 'crud-ui', title: 'CRUD Operations UI', description: 'Edit and delete buttons with confirmation dialogs', completed: true, category: 'frontend' },

    // Routing & Pages
    { id: 'home-route', title: 'Home Route (/)', description: 'Landing page with navigation cards and features', completed: true, category: 'routing' },
    { id: 'shop-route', title: 'Shop Route (/shop)', description: 'E-commerce interface with shopping cart', completed: true, category: 'routing' },
    { id: 'bakeries-route', title: 'Bakeries Route (/bakeries)', description: 'Bakery locations finder with search', completed: true, category: 'routing' },
    { id: 'admin-route', title: 'Admin Route (/admin)', description: 'Management dashboard for items and bakeries', completed: true, category: 'routing' },
    { id: 'status-route', title: 'Status Route (/status)', description: 'Development progress tracking page', completed: true, category: 'routing' },
    { id: 'responsive-design', title: 'Responsive Design', description: 'Mobile-friendly layouts across all pages', completed: true, category: 'routing' },

    // Core E-commerce Features
    { id: 'shopping-cart', title: 'Shopping Cart', description: 'Full cart functionality with add/remove/update quantities', completed: true, category: 'ecommerce' },
    { id: 'shop-interface', title: 'Shop Interface', description: 'Complete e-commerce browsing with search and filters', completed: true, category: 'ecommerce' },
    { id: 'cart-sidebar', title: 'Cart Sidebar', description: 'Sliding cart with item management and totals', completed: true, category: 'ecommerce' },
    { id: 'price-calculation', title: 'Price Calculation', description: 'Real-time cart totals and item pricing', completed: true, category: 'ecommerce' },
    { id: 'order-management', title: 'Order Management', description: 'Create, track, and manage customer orders', completed: false, category: 'ecommerce' },
    { id: 'order-history', title: 'Order History', description: 'Customer order tracking and history', completed: false, category: 'ecommerce' },
    { id: 'inventory-management', title: 'Inventory Management', description: 'Stock tracking per bakery location', completed: false, category: 'ecommerce' },
    { id: 'location-delivery', title: 'Location-based Delivery Logic', description: 'Automatic bakery selection by pincode', completed: false, category: 'ecommerce' },

    // Authentication & Authorization
    { id: 'user-auth', title: 'User Authentication', description: 'Login/logout system', completed: false, category: 'auth' },
    { id: 'admin-auth', title: 'Admin Authentication', description: 'Secure admin access for item/bakery management', completed: false, category: 'auth' },
    { id: 'jwt-session', title: 'JWT/Session Management', description: 'Secure user session handling', completed: false, category: 'auth' },
    { id: 'password-reset', title: 'Password Reset', description: 'User account recovery system', completed: false, category: 'auth' },

    // Payment & Checkout
    { id: 'payment-gateway', title: 'Payment Gateway Integration', description: 'Stripe, PayPal, or similar', completed: false, category: 'payment' },
    { id: 'checkout-process', title: 'Checkout Process', description: 'Multi-step order completion', completed: false, category: 'payment' },
    { id: 'order-confirmation', title: 'Order Confirmation', description: 'Email/SMS notifications', completed: false, category: 'payment' },
    { id: 'invoice-generation', title: 'Invoice Generation', description: 'PDF receipts and invoices', completed: false, category: 'payment' },

    // Advanced Features
    { id: 'order-tracking', title: 'Real-time Order Tracking', description: 'Live delivery status updates', completed: false, category: 'advanced' },
    { id: 'customer-reviews', title: 'Customer Reviews', description: 'Item rating and review system', completed: false, category: 'advanced' },
    { id: 'search-filtering', title: 'Search & Filtering', description: 'Advanced item discovery', completed: false, category: 'advanced' },
    { id: 'recommendations', title: 'Recommendations', description: 'Personalized item suggestions', completed: false, category: 'advanced' },
    { id: 'loyalty-program', title: 'Loyalty Program', description: 'Customer rewards and points system', completed: false, category: 'advanced' },
    { id: 'bulk-orders', title: 'Bulk Orders', description: 'Corporate/event ordering system', completed: false, category: 'advanced' },

    // Admin & Analytics
    { id: 'admin-dashboard-full', title: 'Admin Dashboard', description: 'Comprehensive management interface with tabs', completed: true, category: 'admin' },
    { id: 'admin-modals', title: 'Admin Modal System', description: 'Modal forms for creating and editing items/bakeries', completed: true, category: 'admin' },
    { id: 'admin-crud', title: 'Admin CRUD Operations', description: 'Complete create, read, update, delete functionality', completed: true, category: 'admin' },
    { id: 'admin-validation', title: 'Admin Form Validation', description: 'Real-time validation and error handling', completed: true, category: 'admin' },
    { id: 'sales-analytics', title: 'Sales Analytics', description: 'Revenue and performance metrics', completed: false, category: 'admin' },
    { id: 'inventory-reports', title: 'Inventory Reports', description: 'Stock levels and movement tracking', completed: false, category: 'admin' },
    { id: 'customer-analytics', title: 'Customer Analytics', description: 'User behavior and preferences', completed: false, category: 'admin' },
    { id: 'delivery-analytics', title: 'Delivery Analytics', description: 'Performance metrics per bakery location', completed: false, category: 'admin' },

    // Mobile & Performance
    { id: 'mobile-app', title: 'Mobile App', description: 'React Native or PWA implementation', completed: false, category: 'mobile' },
    { id: 'push-notifications', title: 'Push Notifications', description: 'Order updates and promotions', completed: false, category: 'mobile' },
    { id: 'offline-support', title: 'Offline Support', description: 'Basic functionality without internet', completed: false, category: 'mobile' },
    { id: 'performance-optimization', title: 'Performance Optimization', description: 'Caching and CDN integration', completed: false, category: 'mobile' },
    { id: 'seo-optimization', title: 'SEO Optimization', description: 'Search engine visibility', completed: false, category: 'mobile' },

    // Integration & Automation
    { id: 'email-marketing', title: 'Email Marketing', description: 'Newsletter and promotional campaigns', completed: false, category: 'integration' },
    { id: 'sms-notifications', title: 'SMS Notifications', description: 'Order updates via text messages', completed: false, category: 'integration' },
    { id: 'social-media', title: 'Social Media Integration', description: 'Share items and reviews', completed: false, category: 'integration' },
    { id: 'third-party-delivery', title: 'Third-party Delivery', description: 'Integration with delivery services', completed: false, category: 'integration' },
    { id: 'accounting-software', title: 'Accounting Software', description: 'Financial system integration', completed: false, category: 'integration' },
];

const categoryColors = {
    backend: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    items: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    bakeries: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    dev: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    user: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    frontend: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    routing: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
    ecommerce: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    auth: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    payment: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    advanced: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    admin: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    mobile: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    integration: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
};

const categoryNames = {
    backend: 'Backend Infrastructure',
    items: 'Items Management',
    bakeries: 'Bakeries Management',
    dev: 'Development Setup',
    user: 'User Management',
    frontend: 'Frontend Interface',
    routing: 'Routing & Pages',
    ecommerce: 'E-commerce Features',
    auth: 'Authentication',
    payment: 'Payment & Checkout',
    advanced: 'Advanced Features',
    admin: 'Admin & Analytics',
    mobile: 'Mobile & Performance',
    integration: 'Integration & Automation',
};

export default function DevelopmentStatus() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = Object.keys(categoryNames) as Array<keyof typeof categoryNames>;
    const filteredTasks = selectedCategory === 'all'
        ? tasks
        : tasks.filter(task => task.category === selectedCategory);

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

    const getTasksByCategory = (category: string) => {
        return tasks.filter(task => task.category === category);
    };

    const getCompletedTasksByCategory = (category: string) => {
        return tasks.filter(task => task.category === category && task.completed).length;
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Overall Progress
                    </h2>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {progressPercentage}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {completedTasks} of {totalTasks} tasks
                        </div>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Filter by Category
                </h3>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => {
                        const categoryTasks = getTasksByCategory(category);
                        const completedCount = getCompletedTasksByCategory(category);
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {categoryNames[category]} ({completedCount}/{categoryTasks.length})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 transition-all duration-200 hover:shadow-xl ${task.completed
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${task.completed
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 dark:bg-gray-600'
                                    }`}>
                                    {task.completed ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                                    )}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                                    {categoryNames[task.category]}
                                </span>
                            </div>
                        </div>

                        <h3 className={`text-lg font-semibold mb-2 ${task.completed
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-gray-800 dark:text-white'
                            }`}>
                            {task.title}
                        </h3>

                        <p className={`text-sm ${task.completed
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-600 dark:text-gray-400'
                            }`}>
                            {task.description}
                        </p>

                        <div className={`mt-4 text-xs font-medium ${task.completed
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-orange-600 dark:text-orange-400'
                            }`}>
                            {task.completed ? '✅ Completed' : '⏳ Pending'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Summary */}
            {selectedCategory === 'all' && (
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                        Progress by Category
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => {
                            const categoryTasks = getTasksByCategory(category);
                            const completedCount = getCompletedTasksByCategory(category);
                            const categoryProgress = Math.round((completedCount / categoryTasks.length) * 100);

                            return (
                                <div key={category} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
                                            {categoryNames[category]}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            {completedCount}/{categoryTasks.length}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${categoryProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right mt-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {categoryProgress}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}