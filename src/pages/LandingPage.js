import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Users, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import useAuthStore from '../store/authStore';

const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const stats = [
    { number: '1.3B', label: 'Tons Food Wasted Annually', icon: '📊' },
    { number: '828M', label: 'People Face Hunger Daily', icon: '😔' },
    { number: '40%', label: 'Food Gets Discarded', icon: '🗑️' },
    { number: '10K+', label: 'NGOs Need Better Access', icon: '🤝' }
  ];

  const workflowSteps = [
    { number: 1, title: 'Donor Uploads Food', description: 'Share surplus food details' },
    { number: 2, title: 'AI Analysis', description: 'System analyzes urgency' },
    { number: 3, title: 'Smart Matching', description: 'Recommends nearby NGOs' },
    { number: 4, title: 'NGO Claims', description: 'First NGO locks donation' },
    { number: 5, title: 'Collection & Delivery', description: 'Food is picked up' },
    { number: 6, title: 'Impact Tracked', description: 'Metrics are updated' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className="relative px-4 py-20 md:py-32 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transforming Food Waste into <span className="gradient-primary text-transparent bg-clip-text">Hope</span> with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                FEEDIN intelligently connects food donors and NGOs to ensure surplus food reaches those who need it most. Using AI-powered matching, demand prediction, and smart donation locking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={isAuthenticated ? '/dashboard/donor' : '/register'}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all group"
                >
                  Donate Food <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to={isAuthenticated ? '/dashboard/ngo' : '/register'}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all"
                >
                  Request Food
                </Link>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="glassmorphism rounded-2xl p-8 overflow-hidden">
                <svg className="w-full h-auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="150" fill="url(#gradient1)" opacity="0.1" />
                  <circle cx="100" cy="100" r="40" fill="#ff7a3d" />
                  <circle cx="300" cy="300" r="40" fill="#22c55e" />
                  <circle cx="200" cy="200" r="35" fill="#fbbf24" />
                  <path
                    d="M140 140 Q200 170 260 260"
                    stroke="#ff7a3d"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff7a3d" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-20 px-4 bg-white/50 backdrop-blur"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glassmorphism rounded-xl p-8 text-center hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <p className="text-4xl mb-2">{stat.icon}</p>
                <p className="text-3xl font-bold gradient-primary text-transparent bg-clip-text mb-2">{stat.number}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How FEEDIN Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="glassmorphism rounded-xl p-8 h-full">
                  <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-primary"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'AI-Powered Matching', desc: 'Smart algorithms match donors with right NGOs' },
              { icon: MapPin, title: 'Route Optimization', desc: 'Fastest, most efficient delivery routes' },
              { icon: Leaf, title: 'Impact Tracking', desc: 'Real-time metrics on food saved & carbon reduced' },
              { icon: Users, title: 'Community First', desc: 'Transparent, conflict-free donation system' },
              { icon: TrendingUp, title: 'Demand Prediction', desc: 'Forecast food requirements using AI' },
              { icon: Leaf, title: 'Gamification', desc: 'Leaderboards to encourage more donations' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glassmorphism rounded-xl p-8 hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default LandingPage;
