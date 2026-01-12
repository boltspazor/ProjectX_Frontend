import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiTrendingUp, FiEye, FiHeart } from 'react-icons/fi';
import { analyticsService } from '../../services';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getOverview();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="content-wrapper max-w-6xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="content-wrapper max-w-6xl">
          <div className="card p-6 text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button onClick={fetchAnalytics} className="btn-primary px-6 py-2">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <p className="text-3xl font-bold">{analytics?.totalViews?.toLocaleString() || 0}</p>
            <p className="text-sm text-green-500 mt-1">
              {analytics?.viewsChange || '+0%'} from last week
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Engagement</span>
              <FiHeart className="text-red-500" />
            </div>
            <p className="text-3xl font-bold">{analytics?.totalEngagement?.toLocaleString() || 0}</p>
            <p className="text-sm text-green-500 mt-1">
              {analytics?.engagementChange || '+0%'} from last week
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Reach</span>
              <FiTrendingUp className="text-secondary" />
            </div>
            <p className="text-3xl font-bold">{analytics?.totalReach?.toLocaleString() || 0}</p>
            <p className="text-sm text-green-500 mt-1">
              {analytics?.reachChange || '+0%'} from last week
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Posts</span>
              <FiBarChart2 className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{analytics?.totalPosts?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Total posts created</p>
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
