'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/shop', label: 'Shop', icon: '🛒' },
        { href: '/bakeries', label: 'Bakeries', icon: '🏪' },
        { href: '/admin', label: 'Admin', icon: '⚙️' },
        { href: '/status', label: 'Status', icon: '📊' },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl">🧁</span>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Bakery Shop
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${pathname === item.href
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}