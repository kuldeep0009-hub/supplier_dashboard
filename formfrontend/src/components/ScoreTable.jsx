import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ScoreTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const mockData = [
    {
      id: 1,
      supplierName: 'TechCorp Solutions',
      productName: 'Laptops',
      onTimeDelivery: 96.5,
      orderAccuracy: 98.2,
      packagingRating: 4.8,
      returnRate: 1.2,
      fulfillmentTime: 18,
      performanceScore: 96.2,
      status: 'Good'
    },
    {
      id: 2,
      supplierName: 'Global Supply Co',
      productName: 'Smartphones',
      onTimeDelivery: 92.1,
      orderAccuracy: 94.5,
      packagingRating: 4.3,
      returnRate: 2.8,
      fulfillmentTime: 24,
      performanceScore: 88.7,
      status: 'Good'
    },
    {
      id: 3,
      supplierName: 'Premium Parts Ltd',
      productName: 'Tablets',
      onTimeDelivery: 78.3,
      orderAccuracy: 85.1,
      packagingRating: 3.2,
      returnRate: 6.5,
      fulfillmentTime: 36,
      performanceScore: 72.4,
      status: 'Moderate'
    },
    {
      id: 4,
      supplierName: 'Quality First Inc',
      productName: 'Headphones',
      onTimeDelivery: 89.7,
      orderAccuracy: 91.3,
      packagingRating: 4.1,
      returnRate: 3.2,
      fulfillmentTime: 28,
      performanceScore: 85.3,
      status: 'Good'
    },
    {
      id: 5,
      supplierName: 'Reliable Suppliers',
      productName: 'Accessories',
      onTimeDelivery: 68.2,
      orderAccuracy: 74.8,
      packagingRating: 2.9,
      returnRate: 8.1,
      fulfillmentTime: 42,
      performanceScore: 64.5,
      status: 'Poor'
    },
    // Add more mock data for pagination demo
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      supplierName: `Supplier ${i + 6}`,
      productName: ['Laptops', 'Smartphones', 'Tablets', 'Headphones', 'Accessories'][i % 5],
      onTimeDelivery: Math.random() * 40 + 60,
      orderAccuracy: Math.random() * 30 + 70,
      packagingRating: Math.random() * 2 + 3,
      returnRate: Math.random() * 8 + 1,
      fulfillmentTime: Math.random() * 30 + 15,
      performanceScore: Math.random() * 40 + 60,
      status: ['Good', 'Moderate', 'Poor'][Math.floor(Math.random() * 3)]
    }))
  ];

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockData.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const styles = {
      Good: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      Moderate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      Poor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Supplier Performance Scores
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Supplier Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                On-Time Delivery
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Order Accuracy
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Packaging Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Return Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fulfillment Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Performance Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {row.supplierName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {row.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.onTimeDelivery.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.orderAccuracy.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(row.packagingRating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.returnRate.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.fulfillmentTime.toFixed(0)}h
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div
                        className={`h-2 rounded-full ${
                          row.performanceScore >= 90
                            ? 'bg-emerald-500'
                            : row.performanceScore >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${row.performanceScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {row.performanceScore.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(row.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex + 1} to {Math.min(endIndex, mockData.length)} of {mockData.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreTable;