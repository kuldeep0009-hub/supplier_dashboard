import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Supplier Performance Dashboard
          </h1>
        </div>
        <p className="text-blue-100 text-lg">
          Track supplier scores by product across regions
        </p>
      </div>
    </header>
  );
};

export default Header;