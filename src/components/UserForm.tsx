import React from 'react';
import { motion } from 'framer-motion';
import { Target, Scale, Dumbbell, Heart } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: {
    name: string;
    weight: string;
    height: string;
    dietaryPreference: string;
    exercise: string;
    fitnessGoal: string;
  }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    weight: '',
    height: '',
    dietaryPreference: 'both',
    exercise: 'running',
    fitnessGoal: 'maintain'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fitnessGoalIcons = {
    weightloss: <Scale className="h-6 w-6 text-red-500" />,
    weightgain: <Target className="h-6 w-6 text-blue-500" />,
    shredded: <Dumbbell className="h-6 w-6 text-purple-500" />,
    maintain: <Heart className="h-6 w-6 text-green-500" />
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-xl p-8"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              required
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              required
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-2">
            What's your fitness goal?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries({
              weightloss: 'Weight Loss',
              weightgain: 'Weight Gain',
              shredded: 'Get Shredded',
              maintain: 'Maintain Active Lifestyle'
            }).map(([value, label]) => (
              <motion.div
                key={value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer p-4 rounded-lg border-2 ${
                  formData.fitnessGoal === value
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: value }))}
              >
                <div className="flex flex-col items-center space-y-2">
                  {fitnessGoalIcons[value as keyof typeof fitnessGoalIcons]}
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">
            Dietary Preference
          </label>
          <select
            id="dietaryPreference"
            name="dietaryPreference"
            value={formData.dietaryPreference}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div>
          <label htmlFor="exercise" className="block text-sm font-medium text-gray-700">
            Favorite Exercise
          </label>
          <select
            id="exercise"
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="running">Running</option>
            <option value="yoga">Yoga</option>
            <option value="strength">Strength Training</option>
            <option value="swimming">Swimming</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Get My One-Week Personalized Diet Plan
        </motion.button>
      </div>
    </motion.form>
  );
};

export default UserForm;