'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Code,
  FileText,
  Globe,
  Github,
  Linkedin,
  Mail,
  Database,
  Layers,
  Server,
  BookOpen,
  UserCircle,
} from 'lucide-react';

export default function About() {
  return (
    <main className='flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white'>
      {/* Header */}
      <div className='w-full bg-gradient-to-r from-indigo-900 to-slate-900 py-12'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <div className='flex items-center text-white hover:opacity-90 transition-opacity'>
                <ArrowLeft className='mr-2 w-5 h-5' />
                Back to Home
              </div>
            </Link>
            <h1 className='text-3xl font-bold text-white'>About Legalyze AI</h1>
            <div className='w-24'></div> {/* Empty div for alignment */}
          </div>
        </div>
      </div>

      {/* About the Platform */}
      <div className='w-full py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-bold text-slate-800 mb-6'>
                What is Legalyze AI?
              </h2>
              <p className='text-lg text-slate-600 mb-4'>
                Legalyze AI is a cutting-edge platform designed to revolutionize
                how legal professionals handle contracts. Using advanced AI and
                machine learning technologies, our platform can analyze,
                summarize, and identify potential issues in legal documents in a
                fraction of the time it would take a human reviewer.
              </p>
              <p className='text-lg text-slate-600 mb-4'>
                Our mission is to make contract analysis more efficient,
                accurate, and accessible for legal teams of all sizes, from solo
                practitioners to enterprise legal departments.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100'>
              <div className='aspect-video bg-slate-100 rounded-lg flex items-center justify-center'>
                <div className='text-4xl font-bold text-slate-400'>
                  Platform Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className='w-full py-16 bg-gradient-to-b from-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-slate-800 mb-12 text-center'>
            How to Use Legalyze AI
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg relative'>
              <div className='absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                1
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800 mt-4'>
                Upload Your Contract
              </h3>
              <p className='text-slate-600'>
                Simply drag and drop your contract file (PDF, DOCX, or TXT) into
                the dashboard upload area. Our system accepts files up to 50MB
                in size.
              </p>
            </div>

            {/* Step 2 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg relative'>
              <div className='absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                2
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800 mt-4'>
                AI Analysis
              </h3>
              <p className='text-slate-600'>
                Our AI engine will automatically analyze your document,
                extracting key clauses, identifying potential risks, and
                highlighting areas that may need attention.
              </p>
            </div>

            {/* Step 3 */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg relative'>
              <div className='absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                3
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800 mt-4'>
                Review and Export
              </h3>
              <p className='text-slate-600'>
                Review the analysis results in our interactive dashboard. Export
                summaries, annotations, and risk assessments in various formats
                for team collaboration.
              </p>
            </div>
          </div>

          <div className='mt-12 text-center'>
            <Link href='/dashboard'>
              <Button className='bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className='w-full py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-slate-800 mb-12 text-center'>
            Technology Stack
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Frontend */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Code className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-4 text-slate-800 text-center'>
                Frontend
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></div>
                  Next.js 14
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></div>
                  React 18
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></div>
                  Tailwind CSS
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></div>
                  Lucide React Icons
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Server className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-4 text-slate-800 text-center'>
                Backend
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                  Node.js
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                  Express.js
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                  RESTful API
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                  OAuth2 Authentication
                </li>
              </ul>
            </div>

            {/* Database */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Database className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-4 text-slate-800 text-center'>
                Database
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                  MongoDB
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                  Mongoose ODM
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                  Redis Cache
                </li>
                
              </ul>
            </div>

            {/* AI & ML */}
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Layers className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-4 text-slate-800 text-center'>
                AI & ML
              </h3>
              <ul className='space-y-2'>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                  Gemini API
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                  TensorFlow.js
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                  NLP Processing
                </li>
                <li className='flex items-center text-slate-600'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                  Custom NER Models
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-16 bg-indigo-50 p-8 rounded-xl'>
            <h3 className='text-2xl font-semibold mb-4 text-slate-800'>
              Additional Technologies
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                Stripe Payments
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                Jest Testing
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                CI/CD Pipeline
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                Docker
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                Kubernetes
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                PDF.js
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                Chart.js
              </div>
              <div className='bg-white p-4 rounded-lg text-center shadow-sm'>
                WebSockets
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Profile */}
      <div className='w-full py-16 bg-gradient-to-r from-slate-900 to-indigo-900 text-white'>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-16 text-center'>
            Meet the Developer
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 items-center'>
            <div className='flex flex-col items-center'>
              <div className='w-48 h-48 bg-indigo-200 rounded-full flex items-center justify-center mb-6 border-4 border-white'>
                <UserCircle className='w-32 h-32 text-indigo-700' />
              </div>

              <div className='flex gap-4 mt-4'>
                <a
                  href='https://github.com/shubhambhadra'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white text-indigo-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors'
                >
                  <Github className='w-5 h-5' />
                </a>
                <a
                  href='https://linkedin.com/in/shubhambhadra'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-white text-indigo-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors'
                >
                  <Linkedin className='w-5 h-5' />
                </a>
                <a
                  href='mailto:shubham.bhadra@example.com'
                  className='bg-white text-indigo-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors'
                >
                  <Mail className='w-5 h-5' />
                </a>
              </div>
            </div>

            <div className='md:col-span-2'>
              <h3 className='text-3xl font-bold mb-4'>Shubham Bhadra</h3>
              <p className='text-xl text-indigo-100 mb-6'>
                Full Stack Developer & AI Enthusiast
              </p>

              <p className='text-lg text-indigo-100 mb-4'>
                Hi there! I'm Shubham, a passionate developer with expertise in
                building AI-powered web applications. With over 5 years of
                experience in full-stack development, I specialize in creating
                intuitive, efficient, and scalable solutions that solve
                real-world problems.
              </p>

              <p className='text-lg text-indigo-100 mb-4'>
                Legalyze AI represents my vision to transform the legal tech
                industry by making contract analysis more accessible and
                efficient through cutting-edge AI technology.
              </p>

              <div className='mt-8 grid grid-cols-2 gap-4'>
                <div className='bg-indigo-800 bg-opacity-50 p-4 rounded-lg'>
                  <h4 className='font-semibold mb-2'>Education</h4>
                  <p>Master of Science in Computer Science</p>
                  <p className='text-indigo-200'>Northeastern University</p>
                </div>
                <div className='bg-indigo-800 bg-opacity-50 p-4 rounded-lg'>
                  <h4 className='font-semibold mb-2'>Experience</h4>
                  <p>HDFC Bank</p>
                  <p className='text-indigo-200'>Ex- SDE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className='w-full py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-slate-800 mb-12 text-center'>
            Documentation
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg'>
              <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <BookOpen className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800 text-center'>
                User Guide
              </h3>
              <p className='text-slate-600 mb-6 text-center'>
                Comprehensive documentation on how to use all features of the
                Legalyze AI platform.
              </p>
              <div className='text-center'>
                <Button className='bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300'>
                  View User Guide
                </Button>
              </div>
            </div>

            <div className='bg-white p-8 rounded-xl border border-slate-100 shadow-lg'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <Code className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-slate-800 text-center'>
                API Documentation
              </h3>
              <p className='text-slate-600 mb-6 text-center'>
                Technical documentation for developers looking to integrate with
                our API.
              </p>
              <div className='text-center'>
                <Button className='bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300'>
                  View API Docs
                </Button>
              </div>
            </div>
          </div>

          <div className='mt-12 text-center'>
            <p className='text-slate-600 mb-4'>
              For any technical issues or feature requests, please visit our
              GitHub repository.
            </p>
            <a
              href='https://github.com/shubhambhadra/legalyze-ai'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button
                variant='outline'
                className='border-2 border-slate-200 bg-white text-slate-700 px-6 py-3 rounded-xl font-medium flex items-center hover:border-slate-300 hover:bg-slate-50 transition-all duration-300'
              >
                <Github className='mr-2 w-5 h-5' />
                GitHub Repository
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='w-full bg-slate-900 py-12 text-slate-400'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center'>
            <div className='text-xl font-bold'>Legalyze AI</div>
            <div className='flex gap-6'>
              <Link href='/' className='hover:text-white transition-colors'>
                Home
              </Link>
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
            <p>
              © 2025 Legalyze AI. All rights reserved. Developed by Shubham
              Bhadra.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
