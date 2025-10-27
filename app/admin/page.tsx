'use client';

import { useState } from 'react';
import ItemForm from '@/components/ItemForm';
import ItemsList from '@/components/ItemsList';
import BakeryForm from '@/components/BakeryForm';
import BakeriesList from '@/components/BakeriesList';

type ActiveTab = 'items' | 'bakeries';
type ActiveModal = 'item-form' | 'bakery-form' | null;

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface Bakery {
    id: number;
    name: string;
    pincode: string;
    createdAt: string;
    updatedAt: string;
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('items');
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [editingBakery, setEditingBakery] = useState<Bakery | null>(null);

    const handleFormSuccess = () => {
        setActiveModal(null);
        setEditingItem(null);
        setEditingBakery(null);
        setRefreshTrigger(prev => prev + 1);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setEditingItem(null);
        setEditingBakery(null);
    };

    const handleEditItem = (item: Item) => {
        setEditingItem(item);
        setActiveModal('item-form');
    };

    const handleDeleteItem = async (id: number, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete item');
            }

            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete item');
        }
    };

    const handleEditBakery = (bakery: Bakery) => {
        setEditingBakery(bakery);
        setActiveModal('bakery-form');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        🧁 Bakery Admin Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Manage your bakery items and locations
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('items')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${activeTab === 'items'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            🧁 Bakery Items
                        </button>
                        <button
                            onClick={() => setActiveTab('bakeries')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${activeTab === 'bakeries'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            🏪 Bakery Locations
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {activeTab === 'items' ? 'Manage Bakery Items' : 'Manage Bakery Locations'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {activeTab === 'items'
                                        ? 'Add, view, and manage your delicious bakery items'
                                        : 'Add, view, and manage your bakery locations for delivery'
                                    }
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveModal(activeTab === 'items' ? 'item-form' : 'bakery-form')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>
                                    {activeTab === 'items' ? 'Add New Item' : 'Add New Bakery'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="space-y-8">
                    {activeTab === 'items' ? (
                        <ItemsList
                            refreshTrigger={refreshTrigger}
                            onEditItem={handleEditItem}
                            onDeleteItem={handleDeleteItem}
                        />
                    ) : (
                        <BakeriesList
                            refreshTrigger={refreshTrigger}
                            onEditBakery={handleEditBakery}
                        />
                    )}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            🧁
                        </div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            Items
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Manage your bakery menu
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            🏪
                        </div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            Locations
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Manage delivery areas
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                            🚚
                        </div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            Delivery
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Location-based routing
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {activeModal === 'item-form' && (
                            <ItemForm
                                onSuccess={handleFormSuccess}
                                onCancel={handleCloseModal}
                                editItem={editingItem}
                            />
                        )}
                        {activeModal === 'bakery-form' && (
                            <BakeryForm
                                onSuccess={handleFormSuccess}
                                onCancel={handleCloseModal}
                                editBakery={editingBakery}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}