import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle, Lock, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useDonationStore from '../../store/donationStore';

const NGODashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { donations, claimDonation, unclaimDonation } = useDonationStore();
  const [myClaimedDonations, setMyClaimedDonations] = useState([]);
  const [countdownTimers, setCountdownTimers] = useState({});
  const [claimTimeouts, setClaimTimeouts] = useState({});

  // Get available donations
  const availableDonations = donations.filter(d => d.status === 'AVAILABLE');
  const myReserved = donations.filter(d => d.claimedBy === user?.id && d.status === 'RESERVED');

  // Mock nearby donations with distance
  const nearbyDonations = [
    { id: 1, name: 'Fresh Vegetables', quantity: '25 kg', distance: 2.5, expiry: 120, priority: 'High', donor: 'John Store' },
    { id: 2, name: 'Fruits Mix', quantity: '15 kg', distance: 3.2, expiry: 90, priority: 'High', donor: 'Alex Market' },
    { id: 3, name: 'Dairy Products', quantity: '50 liters', distance: 5.1, expiry: 180, priority: 'Medium', donor: 'Dairy Farm' },
    { id: 4, name: 'Bread & Bakery', quantity: '30 kg', distance: 1.8, expiry: 60, priority: 'Critical', donor: 'Bakery Shop' }
  ];

  // Countdown timer for reservations
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTimers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1;
          } else {
            // Auto-release after 15 minutes (900 seconds)
            if (claimTimeouts[key]) {
              unclaimDonation(parseInt(key));
              toast.error(`Donation ${key} has been released due to timeout.`);
              delete updated[key];
              const newTimeouts = { ...claimTimeouts };
              delete newTimeouts[key];
              setClaimTimeouts(newTimeouts);
            }
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [claimTimeouts]);

  const handleClaimDonation = (donationId) => {
    claimDonation(donationId, user?.id);
    setCountdownTimers(prev => ({ ...prev, [donationId]: 900 })); // 15 minutes
    setClaimTimeouts(prev => ({ ...prev, [donationId]: true }));
    toast.success('Donation claimed! You have 15 minutes to confirm.');
  };

  const handleConfirmPickup = (donationId) => {
    toast.success('Pickup confirmed! Status updated to COLLECTION IN PROGRESS');
    // Update status logic here
    const newTimers = { ...countdownTimers };
    delete newTimers[donationId];
    setCountdownTimers(newTimers);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-primary text-transparent bg-clip-text">FEEDIN</h1>
            <p className="text-gray-600 text-sm">NGO Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'NGO'}</span>
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
        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div className="glassmorphism rounded-xl p-6" whileHover={{ y: -5 }}>
            <p className="text-gray-600 text-sm font-medium mb-2">Nearby Donations</p>
            <p className="text-4xl font-bold text-gray-900">{availableDonations.length}</p>
          </motion.div>
          <motion.div className="glassmorphism rounded-xl p-6" whileHover={{ y: -5 }}>
            <p className="text-gray-600 text-sm font-medium mb-2">My Reserved</p>
            <p className="text-4xl font-bold text-gray-900">{myReserved.length}</p>
          </motion.div>
          <motion.div className="glassmorphism rounded-xl p-6" whileHover={{ y: -5 }}>
            <p className="text-gray-600 text-sm font-medium mb-2">Total Received</p>
            <p className="text-4xl font-bold text-gray-900">156</p>
          </motion.div>
        </motion.div>

        {/* My Reserved Donations */}
        {myReserved.length > 0 && (
          <motion.div
            className="glassmorphism rounded-xl p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Lock size={24} className="text-orange-500" />
              <span>My Reserved Donations</span>
            </h2>
            <div className="space-y-4">
              {myReserved.map((donation) => (
                <div key={donation._id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{donation.foodName}</h3>
                      <p className="text-gray-600 text-sm">Quantity: {donation.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">{formatTime(countdownTimers[donation._id] || 0)}</p>
                      <p className="text-xs text-gray-600">Time remaining</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3 mb-3">
                    <p className="text-sm text-gray-700"><strong>Donor:</strong> {donation.donorName || 'Unknown'}</p>
                    <p className="text-sm text-gray-700"><strong>Pickup:</strong> {donation.pickupAddress}</p>
                    <p className="text-sm text-gray-700"><strong>Contact:</strong> {donation.contactNumber}</p>
                  </div>
                  <button
                    onClick={() => handleConfirmPickup(donation._id)}
                    className="w-full py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Confirm Pickup & Contact Donor
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Nearby Donations */}
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Donations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nearbyDonations.map((donation) => (
              <motion.div
                key={donation.id}
                className="glassmorphism rounded-xl p-6 hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{donation.name}</h3>
                    <p className="text-gray-600 text-sm">{donation.quantity}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(donation.priority)}`}>
                    {donation.priority}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{donation.distance} km away</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-orange-500" />
                    <span>Expires in {donation.expiry} minutes</span>
                  </div>
                  <div className="text-xs">
                    <strong>Donor:</strong> {donation.donor}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all"
                    style={{ width: `${(donation.expiry / 180) * 100}%` }}
                  ></div>
                </div>

                <button
                  onClick={() => handleClaimDonation(donation.id)}
                  className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Claim Donation
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NGODashboard;
