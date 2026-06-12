import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Leaf, Heart, LogOut } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useDonationStore from '../../store/donationStore';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { donations, addDonation } = useDonationStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    foodName: '',
    category: 'Vegetables',
    quantity: '',
    expiryTime: '',
    pickupAddress: '',
    contactNumber: '',
    foodImage: ''
  });

  // Mock data
  const stats = [
    { label: 'Total Donations', value: 24, icon: ShoppingBagIcon, color: 'orange' },
    { label: 'Meals Saved', value: 1248, icon: Heart, color: 'red' },
    { label: 'Impact Score', value: 8750, icon: TrendingUp, color: 'green' },
    { label: 'Carbon Reduced (kg)', value: 356, icon: Leaf, color: 'emerald' }
  ];

  const chartData = [
    { month: 'Jan', donations: 4, meals: 240 },
    { month: 'Feb', donations: 3, meals: 180 },
    { month: 'Mar', donations: 5, meals: 320 },
    { month: 'Apr', donations: 6, meals: 420 },
    { month: 'May', donations: 8, meals: 640 },
    { month: 'Jun', donations: 12, meals: 1248 }
  ];

  const categoryData = [
    { name: 'Vegetables', value: 35 },
    { name: 'Fruits', value: 25 },
    { name: 'Dairy', value: 20 },
    { name: 'Grains', value: 20 }
  ];

  const COLORS = ['#ff7a3d', '#fbbf24', '#22c55e', '#3b82f6'];

  const recentDonations = [
    { id: 1, name: 'Vegetables Mix', quantity: '25 kg', status: 'DELIVERED', date: '2024-06-12' },
    { id: 2, name: 'Fresh Fruits', quantity: '15 kg', status: 'PICKED UP', date: '2024-06-11' },
    { id: 3, name: 'Dairy Products', quantity: '50 liters', status: 'RESERVED', date: '2024-06-10' },
    { id: 4, name: 'Bread & Grains', quantity: '40 kg', status: 'AVAILABLE', date: '2024-06-09' }
  ];

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateDonation = (e) => {
    e.preventDefault();
    const donation = {
      _id: Date.now(),
      ...formData,
      status: 'AVAILABLE',
      createdAt: new Date(),
      donorId: user?.id
    };
    addDonation(donation);
    toast.success('Donation created successfully!');
    setShowCreateForm(false);
    setFormData({
      foodName: '',
      category: 'Vegetables',
      quantity: '',
      expiryTime: '',
      pickupAddress: '',
      contactNumber: '',
      foodImage: ''
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const ShoppingBagIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-primary text-transparent bg-clip-text">FEEDIN</h1>
            <p className="text-gray-600 text-sm">Donor Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'Donor'}</span>
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
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = stat.color === 'orange' ? 'text-orange-500' : 
                             stat.color === 'red' ? 'text-red-500' :
                             stat.color === 'green' ? 'text-green-500' : 'text-blue-500';
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
                  </div>
                  <Icon className={`${colorClass} w-8 h-8`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Create Donation Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create New Donation</span>
          </button>
        </motion.div>

        {/* Create Donation Form */}
        {showCreateForm && (
          <motion.div
            className="glassmorphism rounded-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Donation</h2>
            <form onSubmit={handleCreateDonation} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleFormChange}
                  placeholder="e.g., Fresh Vegetables Mix"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy</option>
                  <option>Grains</option>
                  <option>Cooked Food</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  placeholder="e.g., 25 kg"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Time</label>
                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={formData.expiryTime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleFormChange}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleFormChange}
                  placeholder="+1 (234) 567-890"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Food Image URL</label>
                <input
                  type="url"
                  name="foodImage"
                  value={formData.foodImage}
                  onChange={handleFormChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Create Donation
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <motion.div
            className="glassmorphism rounded-xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Donation Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="donations" stroke="#ff7a3d" strokeWidth={2} name="Donations" />
                <Line type="monotone" dataKey="meals" stroke="#22c55e" strokeWidth={2} name="Meals Saved" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            className="glassmorphism rounded-xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Food Categories</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Donations */}
        <motion.div
          className="glassmorphism rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Donations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Food Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{donation.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{donation.quantity}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                        donation.status === 'PICKED UP' ? 'bg-blue-100 text-blue-700' :
                        donation.status === 'RESERVED' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{donation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;
