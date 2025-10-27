'use client';

import { useState, useEffect } from 'react';

interface Bakery {
    id: number;
    name: string;
    pincode: string;
    createdAt: string;
    updatedAt: string;
}

interface BakeryFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    editBakery?: Bakery | null;
}

export default function BakeryForm({ onSuccess, onCancel, editBakery }: BakeryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        pincode: '',
    });
    const [loading, setLoading] = useState(false);

    // Initialize form with edit data
    useEffect(() => {
        if (editBakery) {
            setFormData({
                name: editBakery.name,
                pincode: editBakery.pincode,
            });
        }
    }, [editBakery]);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Format pincode to only allow numbers and limit to 6 digits
        if (name === 'pincode') {
            const numericValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = editBakery ? `/api/bakeries/${editBakery.id}` : '/api/bakeries';
            const method = editBakery ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${editBakery ? 'update' : 'create'} bakery`);
            }

            // Reset form
            setFormData({
                name: '',
                pincode: '',
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    🏪 {editBakery ? 'Edit' : 'Add New'} Bakery Location
                </h2>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bakery Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bakery Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., Downtown Bakery"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Minimum 4 characters required
                    </p>
                </div>

                {/* Pincode */}
                <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Delivery Pincode *
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., 110001"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Enter 6-digit pincode for delivery area ({formData.pincode.length}/6)
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                                How Delivery Works
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                When customers place orders, the system will automatically select the nearest bakery based on their pincode for faster delivery.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading || formData.pincode.length !== 6}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Bakery...
                            </>
                        ) : (
                            `🏪 ${editBakery ? 'Update' : 'Create'} Bakery`
                        )}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}