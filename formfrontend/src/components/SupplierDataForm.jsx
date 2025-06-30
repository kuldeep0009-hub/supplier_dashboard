import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

const SupplierDataForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    supplierName: '',
    region: '',
    purchaseDate: '',
    unitsPurchased: '',
    unitCost: '',
    deliveryTimeDays: '',
    orderAccuracy: '',
    damagedOnArrival: '',
    unitsReturned: '',
    returnRate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regions = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];
  const products = ['Laptops', 'Smartphones', 'Tablets', 'Headphones', 'Accessories', 'Monitors', 'Keyboards'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate return rate when units returned or units purchased change
    if (name === 'unitsReturned' || name === 'unitsPurchased') {
      const unitsReturned = name === 'unitsReturned' ? parseFloat(value) || 0 : parseFloat(formData.unitsReturned) || 0;
      const unitsPurchased = name === 'unitsPurchased' ? parseFloat(value) || 0 : parseFloat(formData.unitsPurchased) || 0;
      
      if (unitsPurchased > 0) {
        const returnRate = ((unitsReturned / unitsPurchased) * 100).toFixed(2);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          returnRate: returnRate
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to your MongoDB endpoint
      // For now, we'll simulate the API call
      console.log('Submitting data to MongoDB:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      setFormData({
        productName: '',
        supplierName: '',
        region: '',
        purchaseDate: '',
        unitsPurchased: '',
        unitCost: '',
        deliveryTimeDays: '',
        orderAccuracy: '',
        damagedOnArrival: '',
        unitsReturned: '',
        returnRate: ''
      });
      
      alert('Data successfully submitted to MongoDB!');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      supplierName: '',
      region: '',
      purchaseDate: '',
      unitsPurchased: '',
      unitCost: '',
      deliveryTimeDays: '',
      orderAccuracy: '',
      damagedOnArrival: '',
      unitsReturned: '',
      returnRate: ''
    });
  };

  if (!isFormOpen) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8 mt-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Supplier Data
          </h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Add Supplier Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add New Supplier Data
        </h2>
        <button
          onClick={() => setIsFormOpen(false)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <select
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>

          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Supplier Name *
            </label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleInputChange}
              required
              placeholder="Enter supplier name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Region *
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Purchase Date *
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Units Purchased */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Units Purchased *
            </label>
            <input
              type="number"
              name="unitsPurchased"
              value={formData.unitsPurchased}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="Enter units purchased"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Unit Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit Cost (₹) *
            </label>
            <input
              type="number"
              name="unitCost"
              value={formData.unitCost}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter unit cost"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Delivery Time Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Delivery Time (Days) *
            </label>
            <input
              type="number"
              name="deliveryTimeDays"
              value={formData.deliveryTimeDays}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="Enter delivery time"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Order Accuracy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order Accuracy (%) *
            </label>
            <input
              type="number"
              name="orderAccuracy"
              value={formData.orderAccuracy}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
              step="0.1"
              placeholder="Enter accuracy percentage"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Damaged on Arrival */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Damaged on Arrival *
            </label>
            <input
              type="number"
              name="damagedOnArrival"
              value={formData.damagedOnArrival}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="Enter damaged units"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Units Returned */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Units Returned *
            </label>
            <input
              type="number"
              name="unitsReturned"
              value={formData.unitsReturned}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="Enter returned units"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Return Rate (Auto-calculated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Return Rate (%) - Auto Calculated
            </label>
            <input
              type="number"
              name="returnRate"
              value={formData.returnRate}
              readOnly
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="h-5 w-5" />
            {isSubmitting ? 'Submitting...' : 'Submit to MongoDB'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierDataForm;