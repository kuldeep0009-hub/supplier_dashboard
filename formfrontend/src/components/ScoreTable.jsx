import React, { useState, useEffect } from 'react';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
const ScoreTable = ({filters}) => {
  const [data, setData] = useState([]);
useEffect(() => {
  axiosInstance.get('/suppliers') // replace with your actual endpoint
    .then((res) => {
      setData(res.data); // Adjust according to your actual API response
    })
    .catch((err) => {
      console.error('Error fetching performance data:', err);
    });
}, []);


const filteredData = data.filter((item) => {
    const matchSupplier = filters.supplier === 'All' || item.supplier_name.toLowerCase() === filters.supplier.toLowerCase();
  const matchRegion = filters.region === 'All' || item.region.toLowerCase() === filters.region.toLowerCase();
  const matchProduct = filters.product === 'All' || item.product_name.toLowerCase() === filters.product.toLowerCase();
  return matchSupplier && matchRegion && matchProduct;
  });

  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =filteredData.slice(startIndex, endIndex);
   
    
  const getStatusBadge = (supplier_score) => {
    const rate = supplier_score; 
   
    
    let status = '';
    if (rate > 90) status = 'Good';
    else if (rate >= 75) status = 'Moderate';
    else status = 'Poor';
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
    const scaledRating = rating * 5;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= scaledRating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
          {scaledRating.toFixed(1)}
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
                Accuracy Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Return Rate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Unit Cost ₹
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
                  {row.supplier_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {row.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.delivery_time_days.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {(row.qc_pass_rate*100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(row.qc_pass_rate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {(row.return_rate*100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {row.unit_cost.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div
                        className={`h-2 rounded-full ${
                          row.supplier_score >= 90
                            ? 'bg-emerald-500'
                            : row.supplier_score >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${row.supplier_score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {row.supplier_score.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(row.supplier_score)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
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