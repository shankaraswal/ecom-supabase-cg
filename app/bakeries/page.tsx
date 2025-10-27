'use client';

import { useState, useEffect } from 'react';

interface Bakery {
    id: number;
    name: string;
    pincode: string;
    createdAt: string;
    updatedAt: string;
}

export default function BakeriesPage() {
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchPincode, setSearchPincode] = useState('');

    const fetchBakeries = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bakeries');

            if (!response.ok) {
                throw new Error('Failed to fetch bakeries');
            }

            const data = await response.json();
            setBakeries(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBakeries();
    }, []);

    const filteredBakeries = bakeries.filter(bakery =>
        bakery.pincode.includes(searchPincode) ||
        bakery.name.toLowerCase().includes(searchPincode.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center space-x-3">
                            <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-xl text-gray-600 dark:text-gray-400">Loading bakeries...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        🏪 Our Bakery Locations
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Find the nearest bakery for fresh deliveries in your area
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by pincode or bakery name..."
                                value={searchPincode}
                                onChange={(e) => setSearchPincode(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                        <p className="font-semibold">Error loading bakeries</p>
                        <p>{error}</p>
                        <button
                            onClick={fetchBakeries}
                            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {bakeries.length}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Total Locations</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {new Set(bakeries.map(b => b.pincode)).size}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Delivery Areas</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            24/7
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Service Hours</div>
                    </div>
                </div>

                {/* Bakeries Grid */}
                {filteredBakeries.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                            {searchPincode ? 'No bakeries found' : 'No bakeries available'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchPincode
                                ? `No bakeries match "${searchPincode}". Try a different search term.`
                                : 'We are expanding our network. Check back soon!'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBakeries.map((bakery) => (
                            <div
                                key={bakery.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Bakery Header */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{bakery.name}</h3>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-medium">{bakery.pincode}</span>
                                            </div>
                                        </div>
                                        <div className="text-3xl">🏪</div>
                                    </div>
                                </div>

                                {/* Bakery Details */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Delivery Area</span>
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {bakery.pincode} & nearby
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Established</span>
                                            <span className="font-semibold text-gray-800 dark:text-white">
                                                {formatDate(bakery.createdAt)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Status</span>
                                            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                                                ✅ Active
                                            </span>
                                        </div>
                                    </div>

                                    {/* Services */}
                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Services</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-green-500">✓</span>
                                                <span className="text-gray-600 dark:text-gray-400">Fresh Baking</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-green-500">✓</span>
                                                <span className="text-gray-600 dark:text-gray-400">Home Delivery</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-green-500">✓</span>
                                                <span className="text-gray-600 dark:text-gray-400">Custom Orders</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-green-500">✓</span>
                                                <span className="text-gray-600 dark:text-gray-400">Same Day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                            Can't find a bakery in your area?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We're constantly expanding our network. Let us know your location and we'll notify you when we open a bakery near you!
                        </p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
                            Request New Location
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}