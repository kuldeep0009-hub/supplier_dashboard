import React, { useState,useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterSection = ({ onFiltersChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSupplier, setSelectedSupplier] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');

  const regions = ['All', 'Delhi NCR', 'Mumbai', 'Ahmedabad', 'Hyderabad', 'Kolkata','Chennai','Bengaluru'];

  const suppliers = [
  "All",
  "Synthetic Supplier",
  "TruValue Commerce",
  "Elite Distributors",
  "Thornton Ltd",
  "Flores-Cook",
  "BrightPath Wholesale",
  "Bass Group",
  "Everest Wholesale",
  "Thompson Group",
  "Nelson-Ramirez",
  "Martin-Mcdowell",
  "Bond-Adkins",
  "Terry, Smith and Weber",
  "Bell, Gardner and Brown",
  "UrbanKart Distributors",
  "Zenith Global Exports",
  "PrimeMart Supplies",
  "Quantum Traders",
  "Murphy, Aguilar and Zimmerman",
  "NextGen Distributors"
];

  const products = ['All',
 'Bournvita',
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
 

  const handleFilterChange = () => {
    onFiltersChange({
      region: selectedRegion,
      supplier: selectedSupplier,
      product: selectedProduct,
      
    });
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedRegion, selectedSupplier, selectedProduct]);

  const SelectDropdown = ({ label, value, options, onChange }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SelectDropdown
          label="Region"
          value={selectedRegion}
          options={regions}
          onChange={setSelectedRegion}
        />
        <SelectDropdown
          label="Supplier"
          value={selectedSupplier}
          options={suppliers}
          onChange={setSelectedSupplier}
        />
        <SelectDropdown
          label="Product"
          value={selectedProduct}
          options={products}
          onChange={setSelectedProduct}
        />
        {/* <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <div className="relative">
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
            >
              {dateRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FilterSection;