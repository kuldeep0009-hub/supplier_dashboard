import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import axios from 'axios';

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

  const regions = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahemdabad'];
  const products = ['Bournvita',
 'Britania marrie biscuit',
 'Cadbury Dairy Milk',
 'Dabur Red',
 'Dawat Rice',
 'Dove shampoo',
 'Garden Successful',
 'Garnier Facewash',
 'Kissan Tomato Ketchup',
 'Lays potato chips',
 'Lux Soap',
 'Maggie',
 'Manforce Condom',
 'Oreo Biscuit',
 'Parle-G',
 'Sensodyne',
 'Surf Excel Detergent',
 'Taj Tea',
 'Tata Tea',
 'Tide Detergent'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'unitsReturned' || name === 'unitsPurchased') {
        const unitsReturned = parseFloat(name === 'unitsReturned' ? value : prev.unitsReturned) || 0;
        const unitsPurchased = parseFloat(name === 'unitsPurchased' ? value : prev.unitsPurchased) || 0;
        if (unitsPurchased > 0) {
          updated.returnRate = ((unitsReturned / unitsPurchased) * 100).toFixed(2);
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/rawdata/add', formData);
      alert('Data successfully submitted to MongoDB!');
      resetForm();
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
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Product Name *', name: 'productName', type: 'select', options: products },
            { label: 'Supplier Name *', name: 'supplierName', type: 'text', placeholder: 'Enter supplier name' },
            { label: 'Region *', name: 'region', type: 'select', options: regions },
            { label: 'Purchase Date *', name: 'purchaseDate', type: 'date' },
            { label: 'Units Purchased *', name: 'unitsPurchased', type: 'number', placeholder: 'Enter units purchased', min: 1 },
            { label: 'Unit Cost (₹) *', name: 'unitCost', type: 'number', placeholder: 'Enter unit cost', min: 0, step: 0.01 },
            { label: 'Delivery Time (Days) *', name: 'deliveryTimeDays', type: 'number', placeholder: 'Enter delivery time', min: 1 },
            { label: 'Order Accuracy (%) *', name: 'orderAccuracy', type: 'number', placeholder: 'Enter accuracy percentage', min: 0, max: 100, step: 0.1 },
            { label: 'Damaged on Arrival *', name: 'damagedOnArrival', type: 'number', placeholder: 'Enter damaged units', min: 0 },
            { label: 'Units Returned *', name: 'unitsReturned', type: 'number', placeholder: 'Enter returned units', min: 0 },
            { label: 'Return Rate (%) - Auto Calculated', name: 'returnRate', type: 'number', readOnly: true, step: 0.01 }
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
              </label>
              {type === 'select' ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select {name === 'productName' ? 'Product' : 'Region'}</option>
                  {rest.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required={!rest.readOnly}
                  readOnly={rest.readOnly}
                  {...rest}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg ${rest.readOnly ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : 'bg-white dark:bg-gray-700'} text-gray-900 dark:text-white`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierDataForm;
