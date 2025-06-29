
import { TrendingUp, Map } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const GraphSection = ({lineChartData,heatmapData}) => {
 

 
  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-amber-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };
 if (!lineChartData || !heatmapData) {
    return <div className="text-center text-gray-500">Loading graphs...</div>;
  }
 const LineChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[400px]">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
        <TrendingUp className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Performance Trend Over Time
      </h3>
    </div>
    
    <ResponsiveContainer width="100%" height="80%">
      <ReLineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
      </ReLineChart>
    </ResponsiveContainer>
  </div>
);


 const Heatmap = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[400px]">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
        <Map className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Region-wise Average Scores
      </h3>
    </div>

    <ResponsiveContainer width="100%" height="80%">
      <BarChart data={heatmapData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar dataKey="score" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <LineChart />
      <Heatmap />
    </div>
  );
};

export default GraphSection;