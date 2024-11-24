import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Dumbbell, ChevronRight, Salad } from 'lucide-react';
import UserForm from './components/UserForm';
import DietPlan from './components/DietPlan';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    height: '',
    dietaryPreference: '',
    exercise: ''
  });
  const [showPlan, setShowPlan] = useState(false);

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data);
    setShowPlan(true);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Salad className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                FounderFit
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Your Health, Simplified!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Get your personalized diet plan designed specifically for busy founders
          </motion.p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                scale: step === 1 ? 1.1 : 1,
                opacity: step === 1 ? 1 : 0.5,
              }}
              className="flex items-center"
            >
              <div className={`rounded-full p-2 ${step === 1 ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                <Apple className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 font-medium">Input Details</span>
            </motion.div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <motion.div
              animate={{
                scale: step === 2 ? 1.1 : 1,
                opacity: step === 2 ? 1 : 0.5,
              }}
              className="flex items-center"
            >
              <div className={`rounded-full p-2 ${step === 2 ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 font-medium">View Plan</span>
            </motion.div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showPlan ? (
            <UserForm onSubmit={handleFormSubmit} />
          ) : (
            <DietPlan userData={formData} />
          )}
        </div>
      </main>

      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 FounderFit. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;