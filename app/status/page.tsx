import DevelopmentStatus from '@/components/DevelopmentStatus';

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        📊 Development Status
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Track the progress of our online bakery shop development
                    </p>
                </div>
                <DevelopmentStatus />
            </div>
        </div>
    );
}