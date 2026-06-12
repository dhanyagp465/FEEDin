import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MapPin, Zap, LogOut } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AIDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeModule, setActiveModule] = useState('recommendation');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // AI Module Data
  const ngoRecommendations = [
    { rank: 1, name: 'NGO Delhi Central', score: 95, distance: 2.5, demand: 'High', availability: '98%' },
    { rank: 2, name: 'NGO Mumbai Aid', score: 82, distance: 4.2, demand: 'High', availability: '87%' },
    { rank: 3, name: 'NGO Bangalore Help', score: 71, distance: 6.8, demand: 'Medium', availability: '76%' }
  ];

  const expiryPriorities = [
    { id: 1, food: 'Fresh Vegetables', urgency: 95, quantity: 25, distance: 2.5, time: 30, priority: 'Critical' },
    { id: 2, food: 'Fruits Mix', urgency: 78, quantity: 15, distance: 3.2, time: 90, priority: 'High' },
    { id: 3, food: 'Dairy Products', urgency: 45, quantity: 50, distance: 5.1, time: 180, priority: 'Medium' }
  ];

  const demandPredictionData = [
    { month: 'Jul', predicted: 1200, actual: 1150 },
    { month: 'Aug', predicted: 1450, actual: 1420 },
    { month: 'Sep', predicted: 1680, actual: 1700 },
    { month: 'Oct', predicted: 1920, actual: 1880 },
    { month: 'Nov', predicted: 2150, actual: null },
    { month: 'Dec', predicted: 2400, actual: null }
  ];

  const heatmapZones = [
    { zone: 'Zone A (Downtown)', hunger: 95, ngoCount: 5, population: 45000, color: '#ff0000' },
    { zone: 'Zone B (Suburbs)', hunger: 72, ngoCount: 3, population: 35000, color: '#ff9900' },
    { zone: 'Zone C (Rural)', hunger: 58, ngoCount: 2, population: 25000, color: '#ffff00' },
    { zone: 'Zone D (Metro)', hunger: 35, ngoCount: 4, population: 55000, color: '#00ff00' }
  ];

  const routeOptimization = {
    route: 'Donor (Main Store) → NGO1 (Downtown) → NGO2 (Suburbs) → Distribution Center',
    distance: '28.5 km',
    time: '1h 45min',
    stops: 3,
    efficiency: '94%',
    carbonSaved: '12.5 kg CO2'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-primary text-transparent bg-clip-text">FEEDIN AI</h1>
            <p className="text-gray-600 text-sm">Intelligence Analytics Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
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
        {/* AI Modules Navigation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[
            { id: 'recommendation', label: 'NGO Recommendation', icon: Brain },
            { id: 'expiry', label: 'Expiry Priority', icon: Zap },
            { id: 'demand', label: 'Demand Prediction', icon: TrendingUp },
            { id: 'heatmap', label: 'Hunger Heatmap', icon: MapPin }
          ].map((module) => {
            const Icon = module.icon;
            return (
              <motion.button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`p-4 rounded-xl font-semibold transition-all flex flex-col items-center space-y-2 ${
                  activeModule === module.id
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'glassmorphism text-gray-900 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={24} />
                <span className="text-xs md:text-sm text-center">{module.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* NGO Recommendation Engine */}
        {activeModule === 'recommendation' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glassmorphism rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Module 1: NGO Recommendation Engine</h2>
              <p className="text-gray-600 mb-6">Smart ranking based on distance, demand, availability, and food requirements</p>
              
              <div className="space-y-4">
                {ngoRecommendations.map((ngo) => (
                  <motion.div
                    key={ngo.rank}
                    className="border border-orange-200 rounded-lg p-4 bg-gradient-to-r from-orange-50 to-transparent hover:shadow-lg transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-lg">
                          {ngo.rank}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{ngo.name}</p>
                          <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                            <span>Distance: {ngo.distance} km</span>
                            <span>Demand: {ngo.demand}</span>
                            <span>Availability: {ngo.availability}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-orange-600">{ngo.score}</p>
                        <p className="text-xs text-gray-600">AI Score</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Expiry Priority Engine */}
        {activeModule === 'expiry' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glassmorphism rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Module 2: Expiry Priority Engine</h2>
              <p className="text-gray-600 mb-6">Formula: Priority = (Urgency × Quantity) ÷ (Distance × Time Remaining)</p>
              
              <div className="space-y-4">
                {expiryPriorities.map((item) => (
                  <motion.div
                    key={item.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all"
                    style={{
                      borderColor: item.priority === 'Critical' ? '#ff0000' : item.priority === 'High' ? '#ff9900' : '#ffff00',
                      background: item.priority === 'Critical' ? '#fff5f5' : item.priority === 'High' ? '#fffaeb' : '#fffbeb'
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{item.food}</p>
                        <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                          <span>Qty: {item.quantity} kg</span>
                          <span>Distance: {item.distance} km</span>
                          <span>Expires: {item.time} min</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold" style={{
                          color: item.priority === 'Critical' ? '#ff0000' : item.priority === 'High' ? '#ff9900' : '#ffff00'
                        }}>
                          {item.urgency}
                        </p>
                        <p className="text-xs font-semibold" style={{
                          color: item.priority === 'Critical' ? '#ff0000' : item.priority === 'High' ? '#ff9900' : '#ffff00'
                        }}>
                          {item.priority}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${item.urgency}%`,
                          background: item.priority === 'Critical' ? '#ff0000' : item.priority === 'High' ? '#ff9900' : '#ffff00'
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Demand Prediction */}
        {activeModule === 'demand' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glassmorphism rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Module 3: Demand Prediction</h2>
              <p className="text-gray-600 mb-6">Predicting future food requirements using historical data, population density, and seasonal patterns</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={demandPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="predicted" stroke="#ff7a3d" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Hunger Heatmap */}
        {activeModule === 'heatmap' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glassmorphism rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Module 4: Hunger Heatmap</h2>
              <p className="text-gray-600 mb-6">Real-time hunger zones based on NGO requests and historical data</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {heatmapZones.map((zone) => (
                    <motion.div
                      key={zone.zone}
                      className="border-2 rounded-lg p-4 hover:shadow-lg transition-all"
                      style={{ borderColor: zone.color }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">{zone.zone}</p>
                          <p className="text-sm text-gray-600 mt-1">Population: {zone.population.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">NGOs: {zone.ngoCount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold" style={{ color: zone.color }}>
                            {zone.hunger}
                          </p>
                          <p className="text-xs text-gray-600">Hunger Index</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="glassmorphism rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">Legend</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded" style={{ background: '#ff0000' }}></div>
                      <span className="text-sm text-gray-600">Critical (90-100)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded" style={{ background: '#ff9900' }}></div>
                      <span className="text-sm text-gray-600">High (70-89)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded" style={{ background: '#ffff00' }}></div>
                      <span className="text-sm text-gray-600">Medium (40-69)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded" style={{ background: '#00ff00' }}></div>
                      <span className="text-sm text-gray-600">Low (0-39)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Route Optimization */}
        <motion.div
          className="glassmorphism rounded-xl p-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Module 5: Route Optimization (Dijkstra Algorithm)</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Optimized Route</h3>
              <div className="space-y-3">
                <div className="border-2 border-orange-300 rounded-lg p-4 bg-orange-50">
                  <p className="font-semibold text-gray-900">{routeOptimization.route}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">Distance</p>
                    <p className="text-2xl font-bold text-orange-600">{routeOptimization.distance}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">Estimated Time</p>
                    <p className="text-2xl font-bold text-orange-600">{routeOptimization.time}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">Stops</p>
                    <p className="text-2xl font-bold text-orange-600">{routeOptimization.stops}</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold">Efficiency</p>
                    <p className="text-2xl font-bold text-green-600">{routeOptimization.efficiency}</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600">CO2 Emissions Saved</p>
                  <p className="text-3xl font-bold text-green-600">{routeOptimization.carbonSaved}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Route Visualization</h3>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 h-80 flex flex-col items-center justify-center">
                <MapPin size={48} className="text-orange-500 mb-4" />
                <p className="text-gray-600 text-center">Interactive map with optimized route would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Integrates with Google Maps API</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIDashboard;
