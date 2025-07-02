import React from 'react';
import SupplierDataForm from '../components/SupplierDataForm';

function SupplierFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Submit Supplier Data</h1>
        <SupplierDataForm />
      </div>
    </div>
  );
}

export default SupplierFormPage;
