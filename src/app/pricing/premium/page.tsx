'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { RAZORPAY_KEY_ID } from '@/lib/razorpay/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Country options for payment
const COUNTRY_OPTIONS = [
  { label: '🇮🇳 India (₹4,499)', value: 'IN', currency: 'INR', amount: 4499 },
  { label: '🇪🇺 European Union (€49)', value: 'EU', currency: 'EUR', amount: 49 },
  { label: '🌍 Other Countries (€49)', value: 'OTHER', currency: 'EUR', amount: 49 }
];

export default function PremiumPage() {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const { hasSubscription, isLoading: isLoadingSubscription } = useSubscription();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const razorpayLoaded = useRef(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[1]); // Default to EU
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Try to detect if user is from India by checking timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndian = timeZone.includes('Asia/Kolkata') || timeZone.includes('India');
    if (isIndian) {
      setSelectedCountry(COUNTRY_OPTIONS[0]); // Set to India if detected
    }
  }, []);

  useEffect(() => {
    // Check subscription and determine if we should show content or redirect
    if (!isLoaded || isLoadingSubscription) {
      return; // Still loading, wait before deciding
    }
    
    if (hasSubscription) {
      // Subscription found - redirect to mock tests
      router.push('/mock-tests');
    } else {
      // No subscription - show pricing page content
      setShowContent(true);
    }
  }, [isLoaded, hasSubscription, isLoadingSubscription, router]);

  useEffect(() => {
    // Load Razorpay script
    if (!razorpayLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        razorpayLoaded.current = true;
        setDebugInfo(prev => prev + '\nRazorpay script loaded successfully.');
      };
      script.onerror = () => {
        setDebugInfo(prev => prev + '\nFailed to load Razorpay script.');
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = COUNTRY_OPTIONS.find(c => c.value === e.target.value);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleInitiatePayment = () => {
    if (!isSignedIn) {
      router.push('/auth/login?redirect=/pricing/premium');
      return;
    }
    setShowCountrySelector(true);
  };

  const isIndianUser = selectedCountry.value === 'IN';

  const handlePayment = async () => {
    setIsLoading(true);
    setError('');
    setDebugInfo('Starting payment process...');

    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }

      setDebugInfo(prev => prev + '\nCreating order...');
      
      // 1. Create order on the server
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedCountry.amount,
          currency: selectedCountry.currency,
        }),
      });

      const orderResponseText = await orderResponse.text();
      setDebugInfo(prev => prev + `\nOrder response: ${orderResponseText}`);
      
      let orderData;
      try {
        orderData = JSON.parse(orderResponseText);
      } catch (e) {
        throw new Error(`Invalid response from server: ${orderResponseText}`);
      }

      if (!orderResponse.ok) {
        throw new Error(`Failed to create order: ${orderData.message || 'Unknown error'}`);
      }

      if (!orderData.success || !orderData.order) {
        throw new Error('Order creation failed');
      }

      setDebugInfo(prev => prev + '\nOrder created successfully. Opening payment form...');

      // 2. Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'IMAT Prep',
        description: 'Premium Mock Tests Subscription',
        order_id: orderData.order.id,
        handler: async function (response: any) {
          setDebugInfo(prev => prev + '\nPayment completed. Verifying payment...');
          // 3. Verify payment on server
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            setDebugInfo(prev => prev + `\nVerification response: ${JSON.stringify(verifyData)}`);

            if (verifyData.success) {
              setDebugInfo(prev => prev + '\nPayment verified successfully! Redirecting...');
              // Payment successful, redirect to mock tests
              router.push('/mock-tests?success=true');
            } else {
              setError('Payment verification failed. Please try again.');
            }
          } catch (error) {
            setError('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          email: '',
        },
        theme: {
          color: '#2563EB',
        },
      };

      // Add Indian payment methods if user selects India
      if (isIndianUser) {
        options.prefill = {
          ...options.prefill,
          contact: '', // Will be filled by user in Razorpay form
        };
        
        // Enable popular Indian payment methods
        options.config = {
          display: {
            blocks: {
              upi: {
                name: "Pay using UPI",
                instruments: [
                  { method: 'upi' }
                ],
              },
              netbanking: {
                name: "Pay using Netbanking",
                instruments: [
                  { method: 'netbanking' }
                ],
              },
              card: {
                name: "Pay using Card",
                instruments: [
                  { method: 'card' }
                ],
              },
              wallet: {
                name: "Pay using Wallet",
                instruments: [
                  { method: 'wallet' }
                ],
              },
            },
            sequence: ["block.upi", "block.netbanking", "block.card", "block.wallet"],
            preferences: {
              show_default_blocks: true,
            },
          },
        };
      }

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        setError(`Payment failed: ${response.error.description}`);
        setDebugInfo(prev => prev + `\nPayment failed: ${JSON.stringify(response.error)}`);
      });
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(`Failed to process payment: ${error.message || 'Unknown error'}`);
      setDebugInfo(prev => prev + `\nError: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format currency based on user location
  const formatCurrency = (amount: number) => {
    if (isIndianUser) {
      return `₹${amount}`;
    }
    return `€${amount}`;
  };

  // Show loading state while checking subscription status
  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unlock All Premium Mock Tests</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your IMAT preparation with our comprehensive suite of premium mock tests designed to help you succeed.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full md:w-1/2">
            <div className="p-6 bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Free Access</h3>
              <p className="text-gray-600 mb-4">Limited preparation resources</p>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-gray-900">{formatCurrency(0)}</span>
                <span className="text-gray-600 ml-1">/forever</span>
              </div>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800">Access to Tests 1-3</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800">Basic performance tracking</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="h-5 w-5 text-gray-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>Premium mock tests</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="h-5 w-5 text-gray-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50">
              <Link 
                href="/mock-tests"
                className="block w-full py-2 px-4 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200"
              >
                Continue with Free
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-full md:w-1/2 border-2 border-blue-500 transform md:scale-105 z-10">
            <div className="p-6 bg-blue-500 text-white">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-white text-blue-600 rounded-full mb-3">ONE-TIME PAYMENT</div>
              <h3 className="text-xl font-semibold mb-1">Premium Access</h3>
              <p className="text-blue-100 mb-4">Complete IMAT preparation</p>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">{isIndianUser ? '₹4,499' : '€49'}</span>
                <span className="ml-1">/one time</span>
              </div>
            </div>
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800"><strong>All in Free Access</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800"><strong>Access to ALL premium tests</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800">Detailed performance analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-800">1 year of updates and new content</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50">
              {showCountrySelector ? (
                <>
                  {/* Country Selection */}
                  <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Select Your Nationality</h4>
                    <select
                      id="country"
                      value={selectedCountry.value}
                      onChange={handleCountryChange}
                      className="block w-full py-3 px-4 border border-blue-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base font-medium text-gray-900"
                    >
                      {COUNTRY_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="font-medium text-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      className="w-1/3 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200"
                      onClick={() => setShowCountrySelector(false)}
                    >
                      Back
                    </button>
                    <button 
                      className={`w-2/3 py-2 px-4 font-medium rounded-md transition duration-200 ${
                        isLoading 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      onClick={handlePayment}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : `Pay ${isIndianUser ? '₹4,499' : '€49'}`}
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  className="w-full py-2 px-4 font-medium rounded-md transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleInitiatePayment}
                >
                  Upgrade Now
                </button>
              )}
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <p className="text-xs text-center text-gray-500 mt-3">
                {isIndianUser ? 'Secure payment via Razorpay (UPI, Netbanking, Cards)' : 'Secure payment via Razorpay'}
              </p>
              
              {/* Debug info (only visible when there are errors) */}
              {error && debugInfo && (
                <div className="mt-4 p-2 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-32">
                  <pre className="whitespace-pre-wrap">{debugInfo}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Premium?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">More Practice</h4>
              <p className="text-gray-600">5+ additional premium mock tests designed by IMAT experts</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Analysis</h4>
              <p className="text-gray-600">Detailed performance tracking and analytics to focus your study</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">One-Time Payment</h4>
              <p className="text-gray-600">No recurring fees - pay once and get access for a full year</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Is this a subscription or one-time payment?</h4>
              <p className="text-gray-600">This is a one-time payment of {isIndianUser ? '₹4,499' : '€49'}. You'll get full access to all premium tests for one year.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">{isIndianUser ? 'We accept all major payment methods in India including UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Cards, and Wallets through our secure payment processor, Razorpay.' : 'We accept all major credit and debit cards through our secure payment processor, Razorpay.'}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">What happens after I purchase premium access?</h4>
              <p className="text-gray-600">You'll immediately get access to all premium tests. Your premium status is linked to your account, so you can access premium content from any device.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 