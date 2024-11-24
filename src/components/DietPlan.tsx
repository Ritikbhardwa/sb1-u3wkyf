import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, Linkedin, Coffee, UtensilsCrossed, Moon } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface DietPlanProps {
  userData: {
    name: string;
    weight: string;
    height: string;
    dietaryPreference: string;
    exercise: string;
    fitnessGoal: string;
  };
}

interface Meal {
  food: string;
  nutrition: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

const DietPlan: React.FC<DietPlanProps> = ({ userData }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const generateMealPlan = (day: string) => {
    const isVegetarian = userData.dietaryPreference === 'vegetarian';
    
    const breakfastOptions: Meal[] = isVegetarian
      ? [
          { food: 'Oatmeal with fruits and nuts', nutrition: { carbs: 45, protein: 12, fat: 8 } },
          { food: 'Greek yogurt with honey and granola', nutrition: { carbs: 35, protein: 15, fat: 6 } },
          { food: 'Whole grain toast with avocado', nutrition: { carbs: 30, protein: 8, fat: 15 } }
        ]
      : [
          { food: 'Eggs with whole grain toast', nutrition: { carbs: 25, protein: 18, fat: 12 } },
          { food: 'Protein smoothie with banana', nutrition: { carbs: 35, protein: 25, fat: 5 } },
          { food: 'Overnight oats with nuts and seeds', nutrition: { carbs: 40, protein: 14, fat: 10 } }
        ];
    
    const lunchOptions: Meal[] = isVegetarian
      ? [
          { food: 'Quinoa bowl with roasted vegetables', nutrition: { carbs: 50, protein: 15, fat: 10 } },
          { food: 'Lentil curry with brown rice', nutrition: { carbs: 55, protein: 18, fat: 8 } },
          { food: 'Mediterranean salad with chickpeas', nutrition: { carbs: 35, protein: 12, fat: 15 } }
        ]
      : [
          { food: 'Grilled chicken salad', nutrition: { carbs: 20, protein: 35, fat: 12 } },
          { food: 'Tuna wrap with vegetables', nutrition: { carbs: 35, protein: 28, fat: 10 } },
          { food: 'Turkey sandwich with avocado', nutrition: { carbs: 40, protein: 25, fat: 15 } }
        ];
    
    const dinnerOptions: Meal[] = isVegetarian
      ? [
          { food: 'Stir-fried tofu with vegetables', nutrition: { carbs: 30, protein: 20, fat: 12 } },
          { food: 'Bean and vegetable soup', nutrition: { carbs: 45, protein: 18, fat: 8 } },
          { food: 'Chickpea curry with quinoa', nutrition: { carbs: 50, protein: 16, fat: 10 } }
        ]
      : [
          { food: 'Grilled fish with vegetables', nutrition: { carbs: 25, protein: 35, fat: 12 } },
          { food: 'Lean beef stir-fry', nutrition: { carbs: 30, protein: 32, fat: 15 } },
          { food: 'Baked chicken breast with sweet potato', nutrition: { carbs: 35, protein: 30, fat: 10 } }
        ];
    
    const breakfast = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
    const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
    const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
    
    return { breakfast, lunch, dinner };
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    // Header with gradient-like styling
    doc.setFillColor(0, 150, 136);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Your Personalized Diet Plan', pageWidth / 2, 25, { align: 'center' });
    
    // User Info
    yPos = 50;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Customized for: ${userData.name}`, 20, yPos);
    doc.text(`Height: ${userData.height} cm | Weight: ${userData.weight} kg`, 20, yPos + 10);
    doc.text(`Goal: ${userData.fitnessGoal.charAt(0).toUpperCase() + userData.fitnessGoal.slice(1)}`, 20, yPos + 20);
    
    // Meal Plan
    yPos = 90;
    days.forEach((day, index) => {
      const meals = generateMealPlan(day);
      
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }

      // Day header
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
      doc.setFontSize(12);
      doc.setTextColor(0, 100, 100);
      doc.text(day, 25, yPos);
      
      yPos += 15;
      doc.setTextColor(0, 0, 0);
      
      // Meals with nutrition info
      Object.entries(meals).forEach(([mealType, meal]) => {
        doc.setFontSize(10);
        doc.text(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${meal.food}`, 25, yPos);
        doc.setFontSize(8);
        doc.text(`Nutrition: Carbs ${meal.nutrition.carbs}g | Protein ${meal.nutrition.protein}g | Fat ${meal.nutrition.fat}g`, 35, yPos + 5);
        yPos += 15;
      });
      
      yPos += 5;
    });

    // Success Story Page with better formatting
    doc.addPage();
    
    // Success Story Header
    doc.setFillColor(0, 150, 136);
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    // Add a decorative element
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(20, 45, pageWidth - 20, 45);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Success Story:', pageWidth / 2, 25, { align: 'center' });
    doc.setFontSize(20);
    doc.text('How Health Fueled Success', pageWidth / 2, 45, { align: 'center' });
    
    // Story content with better spacing and formatting
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    const story = `At just 23 years old friends, Ritik and Arpit has achieved what many dream of—flipping 6 successful businesses and running a thriving 7-figure biz. But behind his unstoppable drive was one secret weapon: this personalized health tool. By following his tailored diet plan, unlocked his peak energy, focus, and performance. If he can do it, so can you. Take charge of your health and fuel your journey to success!`;
    
    const lines = doc.splitTextToSize(story, pageWidth - 40);
    doc.text(lines, 20, 80);
    
    // Add decorative elements
    doc.setDrawColor(0, 150, 136);
    doc.setLineWidth(2);
    doc.line(20, 140, pageWidth - 20, 140);
    
    // Connect section with icons
    doc.setFontSize(16);
    doc.setTextColor(0, 150, 136);
    doc.text('Connect with Us', pageWidth / 2, 160, { align: 'center' });
    
    doc.setTextColor(0, 0, 255);
    doc.setFontSize(12);
    doc.textWithLink('Ritik\'s LinkedIn Profile', pageWidth / 2, 180, {
      url: 'https://www.linkedin.com/in/ritik-bhardwaj-2293301ab/',
      align: 'center'
    });
    doc.textWithLink('Arpit\'s LinkedIn Profile', pageWidth / 2, 200, {
      url: 'https://linkedin.com/in/arpit-jain-01/',
      align: 'center'
    });

    doc.save('personalized-diet-plan.pdf');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl p-4 md:p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Personalized Diet Plan
        </h2>
        <p className="text-gray-600">
          Customized for {userData.name} based on their {userData.fitnessGoal} goals
        </p>
      </div>

      <div className="space-y-6">
        {days.map((day, index) => {
          const meals = generateMealPlan(day);
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{day}</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(meals).map(([mealType, meal]) => (
                  <div key={mealType} className="pl-4">
                    <div className="flex items-center mb-2">
                      {mealType === 'breakfast' && <Coffee className="h-4 w-4 text-emerald-500 mr-2" />}
                      {mealType === 'lunch' && <UtensilsCrossed className="h-4 w-4 text-emerald-500 mr-2" />}
                      {mealType === 'dinner' && <Moon className="h-4 w-4 text-emerald-500 mr-2" />}
                      <span className="text-sm font-medium text-gray-500 capitalize">{mealType}</span>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm text-gray-900">{meal.food}</p>
                      <p className="text-xs text-gray-500">
                        Carbs: {meal.nutrition.carbs}g | Protein: {meal.nutrition.protein}g | Fat: {meal.nutrition.fat}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownload}
        className="mt-8 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        <Download className="h-5 w-5 mr-2" />
        Download My Personalized Chart
      </motion.button>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Additional Recommendations</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Stay hydrated: Drink 8-10 glasses of water daily</li>
          <li>• Take regular breaks from work for light stretching</li>
          <li>• Consider meal prepping on weekends</li>
          <li>• Maintain consistent meal timings</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <a
            href="https://www.linkedin.com/in/ritik-bhardwaj-2293301ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Linkedin className="h-5 w-5 mr-2" />
            Connect with Ritik on LinkedIn
          </a>
        </div>
        <div className="flex items-center justify-between">
          <a
            href="https://linkedin.com/in/arpit-jain-01/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Linkedin className="h-5 w-5 mr-2" />
            Connect with Arpit on LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlan;