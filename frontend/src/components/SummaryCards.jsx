import React from 'react';
import { Trophy, AlertTriangle, TrendingUp } from 'lucide-react';

const SummaryCards = ({data}) => {
  if (!data) return <div>Loading summary...</div>;
  const cards = [
    {
      title: 'Best Performing Supplier',
      value: data.bestSupplier.name,
      subtitle:`${data.bestSupplier.score}% Performance Score`,
      icon: Trophy,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
    },
    {
      title: 'Most Flagged Product',
      value: data.mostFlaggedProduct.name,
      subtitle: `${data.mostFlaggedProduct.issueCount} Quality Issues`,
      icon: AlertTriangle,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
    },
    {
      title: 'Average Score Trend',
      value: `${data.averageScoreTrend}%`,
      subtitle: 'vs. Last Month',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bgGradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${card.gradient} p-3 rounded-lg shadow-md`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {card.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;