import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Activity, AlertCircle, LogOut } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const systemStats = [
    { label: 'Total Users', value: 2847, change: '+12%', icon: Users, color: 'orange' },
    { label: 'Total Donations', value: 5284, change: '+23%', icon: TrendingUp, color: 'green' },
    { label: 'NGOs Registered', value: 342, change: '+8%', icon: Users, color: 'blue' },
    { label: 'Active Campaigns', value: 89, change: '+5%', icon: Activity, color: 'red' }
  ];

  const chartData = [
    { month: 'Jan', donations: 240, ngos: 24, users: 221 },
    { month: 'Feb', donations: 380, ngos: 35, users: 340 },
    { month: 'Mar', donations: 420, ngos: 42, users: 380 },
    { month: 'Apr', donations: 550, ngos: 48, users: 500 },
    { month: 'May', donations: 680, ngos: 56, users: 620 },
    { month: 'Jun', donations: 900, ngos: 68, users: 850 }
  ];

  const recentActivity = [
    { id: 1, user: 'John Store', action: 'Created donation', time: '2 hours ago', status: 'success' },
    { id: 2, user: 'NGO Delhi', action: 'Claimed donation', time: '4 hours ago', status: 'success' },
    { id: 3, user: 'Alex Market', action: 'Donation expired', time: '1 day ago', status: 'warning' },
    { id: 4, user: 'NGO Mumbai', action: 'Completed delivery', time: '1 day ago', status: 'success' },
    { id: 5, user: 'Admin User', action: 'System maintenance', time: '2 days ago', status: 'info' }
  ];

  const topDonors = [
    { rank: 1, name: 'John Store', donations: 145, meals: 8500, score: 9500 },
    { rank: 2, name: 'Alex Market', donations: 128, meals: 7200, score: 8900 },
    { rank: 3, name: 'Green Farm', donations: 112, meals: 6400, score: 8200 },
    { rank: 4, name: 'Bakery House', donations: 98, meals: 5600, score: 7800 },
    { rank: 5, name: 'Dairy Farm', donations: 87, meals: 4900, score: 7200 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-primary text-transparent bg-clip-text">FEEDIN</h1>
            <p className="text-gray-600 text-sm">Admin Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = stat.color === 'orange' ? 'text-orange-500' : 
                             stat.color === 'green' ? 'text-green-500' :
                             stat.color === 'blue' ? 'text-blue-500' : 'text-red-500';
            return (
              <motion.div
                key={index}
                className="glassmorphism rounded-xl p-6 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-green-600 text-sm font-semibold mt-2">{stat.change}</p>
                  </div>
                  <Icon className={`${colorClass} w-8 h-8`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['overview', 'donations', 'users', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div className="glassmorphism rounded-xl p-6" whileHover={{ shadow: 'lg' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">System Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="donations" stroke="#ff7a3d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div className="glassmorphism rounded-xl p-6" whileHover={{ shadow: 'lg' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">NGO Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ngos" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div className="glassmorphism rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle size={18} className={activity.status === 'success' ? 'text-green-500' : 'text-yellow-500'} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Top Donors Tab */}
        {activeTab === 'donations' && (
          <motion.div className="glassmorphism rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Donors Leaderboard</h2>
            <div className="space-y-3">
              {topDonors.map((donor) => (
                <div key={donor.rank} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      {donor.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{donor.name}</p>
                      <p className="text-sm text-gray-600">{donor.donations} donations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{donor.score}</p>
                    <p className="text-xs text-gray-600">{donor.meals} meals saved</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div className="glassmorphism rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div className="glassmorphism rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Analytics</h2>
            <p className="text-gray-600">Advanced analytics features coming soon...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
