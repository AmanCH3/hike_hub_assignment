import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { postToEsewa } from '../../utils/esewa'; // Adjust path if needed // Adjust path to your AuthContext file
import { AuthContext } from '../../auth/authProvider';

// This data can be kept in this file or moved to a separate constants file.
const plansData = [
    {
        title: "Basic",
        price: "Free",
        description: "Perfect for casual hikers.",
        features: [
          { text: "Access to public trails", included: true },
          { text: "Basic packing checklists", included: true },
          { text: "Join up to 3 hiking groups", included: true },
          { text: "View beginner tips", included: true },
          { text: "Premium trail maps", included: false },
          { text: "Unlimited group creation", included: false },
          { text: "Guided hikes", included: false },
          { text: "Advanced safety features", included: false },
        ],
    },
    {
        title: "Pro",
        price: "999",
        period: "/month",
        description: "For regular hikers seeking more features.",
        features: [
            { text: "All features from Basic", included: true },
            { text: "Premium trail maps", included: true },
            { text: "Unlimited group creation", included: true },
            { text: "Advanced weather forecasts", included: true },
            { text: "Guided hikes", included: false },
            { text: "Priority support", included: false },
        ],
        isPopular: true,
    },
    {
        title: "Premium",
        price: "1999",
        period: "/month",
        description: "For dedicated hikers who want everything.",
        features: [
            { text: "All features from Pro", included: true },
            { text: "Guided hikes (1 per month)", included: true },
            { text: "Priority support 24/7", included: true },
            { text: "Exclusive trail access", included: true },
        ],
    },
];


export function SubscriptionPlans() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');
  
  // Get user data and authentication status from the AuthContext
  const { user, isAuthenticated } = useContext(AuthContext);

  // Derive the user's current plan from the context, defaulting to 'Basic' if not available.
  // Assumes user object has a 'subscription' property (e.g., user.subscription = "Pro")
  const currentUserPlan = user?.subscription || 'Basic';

  // This function handles the logic when a user clicks a plan button
  const handlePayment = async (plan) => {
    // If user clicks the plan they are already on, show a toast and stop.
    if (currentUserPlan.toLowerCase() === plan.title.toLowerCase()) {
        toast.info(`You are already subscribed to the ${plan.title} plan.`);
        return; 
    }

    // Do not process payment for free plans
    if (plan.price === 'Free' || !plan.price) {
        return;
    }

    setLoadingPlan(plan.title);
    setError('');

    try {
      const token = localStorage.getItem('token'); 

      if (!isAuthenticated || !token) {
        // This check is a safeguard, but the button should be disabled anyway.
        toast.error('You must be logged in to make a payment.');
        setLoadingPlan(null);
        return;
      }

      // Call the backend to initiate the eSewa payment process
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/initiate`,
        {
          plan: plan.title,
          amount: parseInt(plan.price, 10),
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      // If the backend responds successfully, redirect the user to eSewa
      if (response.data.success) {
        postToEsewa(response.data.data);
      } else {
        setError(response.data.message || 'Failed to initiate payment.');
      }

    } catch (err) {
      console.error("Payment initiation error:", err);
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      {/* Display a general error message if something goes wrong */}
      {error && <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plansData.map((plan, index) => {
          const isCurrent = currentUserPlan.toLowerCase() === plan.title.toLowerCase();
          const isLoading = loadingPlan === plan.title;
          
          return (
            <Card key={index} className={`flex flex-col ${isCurrent ? 'border-green-600' : ''} ${plan.isPopular ? 'border-2 shadow-lg' : ''}`}>
              {plan.isPopular && (
                <div className="text-center py-1 bg-green-500 text-white font-semibold text-sm rounded-t-lg">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">
                    {plan.price !== "Free" ? `रु ${plan.price}` : 'Free'}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.included ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                      <span className="text-sm text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={isCurrent ? "outline" : "default"}
                  onClick={() => handlePayment(plan)}
                  // The button is disabled if user is not logged in, if it's a free plan, or if it's currently loading.
                  // It is NOT disabled for the current plan, allowing the toast notification to trigger.
                  disabled={!isAuthenticated || plan.price === 'Free' || isLoading}
                >
                  {isLoading 
                    ? "Processing..."
                    : isCurrent 
                      ? `Your Current Plan`
                      : `Upgrade to ${plan.title}`
                  }
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}