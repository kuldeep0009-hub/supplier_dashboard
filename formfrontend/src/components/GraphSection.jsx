import React, { useEffect,useState } from 'react';
import { TrendingUp, Map } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const GraphSection = () => {
  // Mock data for line chart visualization
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchGraphData = async ()=>{
      try{
        const [lineRes] = await Promise.all(
          [axiosInstance.get("/trends")]
          
        );
        setLineChartData(lineRes.data); 
        //console.log("lineres.data is",lineRes.data)

      } catch(error){
        console.error('Error fetching graph data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGraphData();
    
  },[]);
  //console.log("line chart dat",lineChartData)
  const missingAvgScore = lineChartData.filter(item => item.avgScore === undefined || item.avgScore === null);
  console.log("missing avgScore",missingAvgScore);
  

  // const lineChartData = [
  //   { month: 'Jan', score: 85 },
  //   { month: 'Feb', score: 87 },
  //   { month: 'Mar', score: 84 },
  //   { month: 'Apr', score: 89 },
  //   { month: 'May', score: 92 },
  //   { month: 'Jun', score: 88 }
  // ];

  // Mock data for heatmap
  const heatmapData = [
    { region: 'Delhi', score: 92 },
    { region: 'Mumbai', score: 88 },
    { region: 'Bangalore', score: 94 },
    { region: 'Chennai', score: 86 },
    { region: 'Kolkata', score: 79 }
  ];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-amber-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const LineChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r  from-blue-500 to-blue-600 p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Trend Over Time
        </h3>
      </div>
      
      <div className="relative h-64">
        <div className="absolute  inset-0 flex items-end justify-between gap-4 px-4">
          {lineChartData.map((data) => (
            <div key={data.month} className="relative  flex flex-col  items-center flex-1 h-full">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                style={{ height: `${(data.avgScore / 100) * 100}%` }}
                title={`${monthNames[data.month-1]}: ${data.AvgScore}%`}
              />
              <div className='grid absolute bottom-0 '>
                   <span className="flex justify-center  text-sm text-gray-600 dark:text-gray-400 mt-">
                {monthNames[data.month-1]}
              </span>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                {data.avgScore??"N/A"}%
              </span>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Heatmap = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
          <Map className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Region-wise Average Scores
        </h3>
      </div>
      
      <div className="space-y-4">
        {heatmapData.map((data) => (
          <div key={data.region} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
              {data.region}
            </span>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${getScoreColor(data.score)} transition-all duration-500`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[45px] text-right">
              {data.score}%
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Score Range:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>60-69</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>70-79</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span>80-89</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span>90+</span>
            </div>
          </div>
        </div>
      </div>
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