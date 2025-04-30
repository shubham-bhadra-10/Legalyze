'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import stripePromise from '@/lib/stripe';
import {
  Globe,
  ArrowRight,
  FileText,
  Shield,
  Clock,
  PiggyBank,
  Scale,
  Zap,
} from 'lucide-react';

export default function Home() {
  const handleUpgrade = async () => {
    try {
      const response = await api.get('/payments/create-checkout-session');
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-white'>
      {/* Hero Section */}
      <div className='w-full max-w-7xl mx-auto px-4 py-20 text-center relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob'></div>
          <div className='absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000'></div>
          <div className='absolute bottom-10 left-1/3 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000'></div>
        </div>

        <div className='relative z-10'>
          <div className='mb-6'>
            <span className='inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full text-sm font-medium text-indigo-800 border border-indigo-100 shadow-sm'>
              <span className='mr-2 text-indigo-500'>✨</span>
              Introducing Simple Metrics for your team
            </span>
          </div>

          <h1 className='text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-700'>
            Revolutionize
            <span className='block mt-2'>Your Contracts</span>
          </h1>

          <p className='text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed'>
            Harness the power of AI to analyze, understand, and optimize your
            contracts in minutes, not days.
          </p>

          <div className='flex flex-wrap justify-center gap-5'>
            <Link href='/dashboard'>
              <Button className='bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-medium flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                Get Started <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </Link>

            <Link href='/about'>
              <Button
                variant='outline'
                className='border-2 border-slate-200 bg-white text-slate-700 px-8 py-6 rounded-xl text-lg font-medium flex items-center hover:border-slate-300 hover:bg-slate-50 transition-all duration-300'
              >
                Learn More <Globe className='ml-2 w-5 h-5' />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className='w-full bg-gradient-to-r from-slate-900 to-indigo-900 py-8'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16'>
            <p className='text-white font-medium'>
              Trusted by leading companies:
            </p>
            <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70'>
              <div className='text-white font-bold text-xl'>ACME Inc.</div>
              <div className='text-white font-bold text-xl'>GlobalTech</div>
              <div className='text-white font-bold text-xl'>FutureCorp</div>
              <div className='text-white font-bold text-xl'>InnovateLaw</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='w-full py-24 bg-gradient-to-b from-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-slate-800 mb-4'>
              Powerful Features
            </h2>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto'>
              Our AI-powered platform transforms how legal teams handle
              contracts
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <FileText className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                AI-powered Analysis
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Leverage advanced AI to analyze contracts quickly and
                accurately, spotting issues that humans might miss.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                Risk Identification
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Instantly spot potential risks and opportunities in your
                contracts with our intelligent risk scoring system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <Clock className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                Streamlined Negotiation
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Accelerate the negotiation process with AI-driven insights and
                automated redlining capabilities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <PiggyBank className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                Cost Reduction
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Cut legal costs by up to 85% by automating contract review
                processes that typically require expensive resources.
              </p>
            </div>

            {/* Feature 5 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <Scale className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                Improved Compliance
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Ensure your contracts meet all regulatory requirements
                automatically with real-time compliance monitoring.
              </p>
            </div>

            {/* Feature 6 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'>
              <div className='w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform duration-300'>
                <Zap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
                Faster Turnaround
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Reduce contract review time from days to minutes with powerful
                AI tools that work around the clock.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className='w-full bg-indigo-50 py-20'>
        <div className='max-w-5xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-slate-800 mb-4'>
              What Our Clients Say
            </h2>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12 relative'>
            <div className='absolute -top-5 -left-5 text-indigo-500 text-8xl opacity-30'>
              "
            </div>
            <div className='relative z-10'>
              <p className='text-xl md:text-2xl text-slate-700 italic mb-8'>
                We've reduced our contract review time by 75% and saved over
                $200,000 in legal fees in just three months. This tool has
                completely transformed our legal operations.
              </p>
              <div className='flex items-center'>
                <div className='w-14 h-14 bg-indigo-200 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-indigo-700 font-bold text-xl'>JD</span>
                </div>
                <div>
                  <p className='font-bold text-slate-800'>Jessica Daniels</p>
                  <p className='text-slate-600'>
                    Legal Operations Director, Fortune 500 Company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='w-full py-24 text-center bg-gradient-to-r from-indigo-900 to-slate-900 text-white'>
        <div className='max-w-4xl mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Ready to transform your contract workflow?
          </h2>
          <p className='text-xl md:text-2xl text-indigo-100 mb-10 leading-relaxed'>
            Join thousands of legal professionals who are saving time and
            reducing risk with our AI-powered contract solution.
          </p>

          <div className='flex flex-wrap justify-center gap-6'>
            <Link href='/dashboard'>
              <Button className='bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                Start Free Trial
              </Button>
            </Link>

            <Button
              className='bg-transparent border-2 border-indigo-300 text-white hover:bg-indigo-800 px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300'
              onClick={handleUpgrade}
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='w-full bg-slate-900 py-12 text-slate-400'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center'>
            <div className='text-xl font-bold'>Legalyze AI</div>
            <div className='flex gap-6'>
              <a href='' className='hover:text-white transition-colors'>
                About
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                Features
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                Pricing
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                Contact
              </a>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-slate-800 text-center'>
            <p>© 2025 Legalyze AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
