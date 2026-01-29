import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiTrendingUp, FiEye, FiHeart, FiUsers } from 'react-icons/fi';
import { analyticsService } from '../../services';
import { useAuth } from '../../context/AuthContext';

const AnalyticsPage = () => {
  const { user } = useAuth();
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
      const response = await analyticsService.getOverview();
      // Backend returns { analytics: { posts: {...}, credits: {...} } }
      setAnalytics(response?.analytics || null);
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
              <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
              <FiBarChart2 className="text-primary" />
            </div>
            <p className="text-3xl font-bold">{analytics?.posts?.total?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Posts created</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Total Likes</span>
              <FiHeart className="text-red-500" />
            </div>
            <p className="text-3xl font-bold">{analytics?.posts?.totalLikes?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              Avg: {analytics?.posts?.averageLikes?.toLocaleString() || 0} per post
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Total Comments</span>
              <FiUsers className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{analytics?.posts?.totalComments?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Community engagement</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Credits Spent</span>
              <FiTrendingUp className="text-secondary" />
            </div>
            <p className="text-3xl font-bold">{analytics?.credits?.totalSpent?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Total AI credits used</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Post Engagement</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Engagement</p>
                  <p className="text-2xl font-bold">
                    {((analytics?.posts?.totalLikes || 0) + (analytics?.posts?.totalComments || 0))?.toLocaleString()}
                  </p>
                </div>
                <FiHeart className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Engagement Rate</p>
                  <p className="text-2xl font-bold">
                    {analytics?.posts?.total > 0 
                      ? ((((analytics?.posts?.totalLikes || 0) + (analytics?.posts?.totalComments || 0)) / analytics?.posts?.total).toFixed(1)) 
                      : '0'}
                  </p>
                </div>
                <FiTrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Credit Usage</h2>
            <div className="space-y-3">
              {analytics?.credits?.spendingByCategory && Object.keys(analytics.credits.spendingByCategory).length > 0 ? (
                Object.entries(analytics.credits.spendingByCategory).map(([category, amount]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold capitalize">{category.replace(/_/g, ' ')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {amount} credits used
                      </p>
                    </div>
                    <span className="text-primary font-semibold">
                      {analytics?.credits?.totalSpent > 0 
                        ? Math.round((amount / analytics.credits.totalSpent) * 100)
                        : 0}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No credit usage data yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-light-border dark:border-dark-border">
                <tr>
                  <th className="text-left py-3">Metric</th>
                  <th className="text-right py-3">Total</th>
                  <th className="text-right py-3">Average</th>
                  <th className="text-right py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Posts Created</td>
                  <td className="text-right">{analytics?.posts?.total?.toLocaleString() || 0}</td>
                  <td className="text-right">-</td>
                  <td className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      (analytics?.posts?.total || 0) > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {(analytics?.posts?.total || 0) > 0 ? 'Active' : 'Start Posting'}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Total Likes Received</td>
                  <td className="text-right">{analytics?.posts?.totalLikes?.toLocaleString() || 0}</td>
                  <td className="text-right">{analytics?.posts?.averageLikes?.toLocaleString() || 0} per post</td>
                  <td className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      (analytics?.posts?.averageLikes || 0) >= 10 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {(analytics?.posts?.averageLikes || 0) >= 10 ? 'Great' : 'Growing'}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <td className="py-3">Total Comments</td>
                  <td className="text-right">{analytics?.posts?.totalComments?.toLocaleString() || 0}</td>
                  <td className="text-right">
                    {analytics?.posts?.total > 0 
                      ? ((analytics?.posts?.totalComments || 0) / analytics?.posts?.total).toFixed(1)
                      : 0} per post
                  </td>
                  <td className="text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      Engaging
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">AI Credits Used</td>
                  <td className="text-right">{analytics?.credits?.totalSpent?.toLocaleString() || 0}</td>
                  <td className="text-right">{user?.credits?.toLocaleString() || 0} remaining</td>
                  <td className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      (user?.credits || 0) > 50 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                      {(user?.credits || 0) > 50 ? 'Plenty' : 'Low'}
                    </span>
                  </td>
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
