import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import Navigation from '../../components/Navigation';

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { user, updateRole } = useAuthStore();

  const roles = [
    {
      id: 'donor',
      title: 'Food Donor',
      icon: ShoppingBag,
      description: 'I want to donate surplus food to help those in need',
      color: 'orange'
    },
    {
      id: 'ngo',
      title: 'NGO / Organization',
      icon: Heart,
      description: 'I represent an NGO and want to receive food donations',
      color: 'green'
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: Shield,
      description: 'I want to manage and monitor the platform',
      color: 'blue'
    }
  ];

  const handleSelectRole = (roleId) => {
    updateRole(roleId);
    toast.success(`Role selected: ${roleId}`);
    
    setTimeout(() => {
      navigate(`/dashboard/${roleId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Navigation />
      
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Select Your Role</h1>
            <p className="text-xl text-gray-600">Choose how you want to participate in FEEDIN</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectRole(role.id)}
                  className="cursor-pointer group"
                >
                  <div className="glassmorphism rounded-2xl p-8 h-full flex flex-col hover:shadow-2xl transition-all transform hover:scale-105">
                    <div className={`w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon size={32} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h2>
                    <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                    
                    <button className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      Select This Role
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-600">
              You can change your role anytime in your account settings.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
