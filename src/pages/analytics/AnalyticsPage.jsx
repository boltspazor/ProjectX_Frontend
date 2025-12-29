import React from 'react';
import { FiBarChart2, FiTrendingUp, FiEye, FiHeart } from 'react-icons/fi';

const AnalyticsPage = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper max-w-6xl">
        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center space-x-3">
            <FiBarChart2 className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your performance and engagement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Total Views</span>
              <FiEye className="text-primary" />
            </div>
            <p className="text-3xl font-bold">12,543</p>
            <p className="text-sm text-green-500 mt-1">+12.5% from last week</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Engagement</span>
              <FiHeart className="text-red-500" />
            </div>
            <p className="text-3xl font-bold">8,432</p>
            <p className="text-sm text-green-500 mt-1">+8.3% from last week</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Reach</span>
              <FiTrendingUp className="text-secondary" />
            </div>
            <p className="text-3xl font-bold">24,128</p>
            <p className="text-sm text-green-500 mt-1">+15.2% from last week</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Credits</span>
              <FiBarChart2 className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold">1,250</p>
            <p className="text-sm text-gray-500 mt-1">Available credits</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Engagement Over Time</h2>
            <div className="h-64 flex items-center justify-center bg-light-card dark:bg-dark-card rounded-lg">
              <p className="text-gray-500">Chart placeholder</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Top Posts</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-light-card dark:bg-dark-card rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded"></div>
                    <div>
                      <p className="font-semibold">Post Title {i}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.floor(Math.random() * 1000)} views
                      </p>
                    </div>
                  </div>
                  <span className="text-primary font-semibold">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Detailed Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-light-border dark:border-dark-border">
                <tr>
                  <th className="text-left py-3">Metric</th>
                  <th className="text-right py-3">Today</th>
                  <th className="text-right py-3">This Week</th>
                  <th className="text-right py-3">This Month</th>
                  <th className="text-right py-3">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Profile Views</td>
                  <td className="text-right">245</td>
                  <td className="text-right">1,843</td>
                  <td className="text-right">7,621</td>
                  <td className="text-right text-green-500">+12%</td>
                </tr>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Post Impressions</td>
                  <td className="text-right">1,234</td>
                  <td className="text-right">8,765</td>
                  <td className="text-right">34,210</td>
                  <td className="text-right text-green-500">+18%</td>
                </tr>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Engagement Rate</td>
                  <td className="text-right">8.4%</td>
                  <td className="text-right">7.9%</td>
                  <td className="text-right">8.1%</td>
                  <td className="text-right text-green-500">+5%</td>
                </tr>
                <tr>
                  <td className="py-3">New Followers</td>
                  <td className="text-right">12</td>
                  <td className="text-right">87</td>
                  <td className="text-right">342</td>
                  <td className="text-right text-green-500">+23%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
