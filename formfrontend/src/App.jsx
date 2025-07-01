import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import SummaryCards from './components/SummaryCards';
import ScoreTable from './components/ScoreTable';
import GraphSection from './components/GraphSection';
import SupplierDataForm from './components/SupplierDataForm';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <FilterSection onFiltersChange={handleFiltersChange} />
        <SummaryCards />
        <ScoreTable filters ={filters} />
        <GraphSection filters={filters} />
        <SupplierDataForm filters={filters} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Supplier Performance Dashboard. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;