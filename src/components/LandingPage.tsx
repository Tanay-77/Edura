import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Building, 
  FileText, 
  BarChart3, 
  Shield,
  Clock,
  Globe,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Users,
      title: 'Student Admissions',
      description: 'Streamlined online admission process with automated data management and student profile creation.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: IndianRupee,
      title: 'Fee Management',
      description: 'Complete fee tracking, payment processing, and automatic receipt generation with real-time analytics.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Building,
      title: 'Hostel Management',
      description: 'Real-time room occupancy tracking, student assignments, and accommodation management.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: FileText,
      title: 'Examination Records',
      description: 'Comprehensive exam result storage, grade calculation, and academic performance tracking.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: BarChart3,
      title: 'Admin Dashboard',
      description: 'Real-time statistics, analytics, and insights for informed decision-making.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Shield,
      title: 'Role-Based Security',
      description: 'Secure access control with different permission levels for students, staff, and administrators.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate repetitive tasks and reduce manual paperwork by up to 80%'
    },
    {
      icon: Globe,
      title: 'Cloud-Based',
      description: 'Access your data anywhere, anytime with secure cloud infrastructure'
    },
    {
      icon: TrendingUp,
      title: 'Improve Efficiency',
      description: 'Streamline operations and improve productivity across all departments'
    },
    {
      icon: CheckCircle,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for users with basic computer knowledge'
    }
  ];

  const stats = [
    { number: '100%', label: 'Digital Workflow' },
    { number: '24/7', label: 'System Availability' },
    { number: '5+', label: 'Integrated Modules' },
    { number: '∞', label: 'Student Capacity' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SMS ERP</h1>
                <p className="text-sm text-gray-600">Student Management System</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Complete ERP Solution for Educational Institutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Integrated Student
              <span className="text-indigo-600 block">Management System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your college operations with our comprehensive ERP solution. 
              Manage admissions, fees, hostels, and examinations all in one powerful platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold">
              <BookOpen className="w-5 h-5" />
              <span>View Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of modules covers every aspect of student management, 
              from admission to graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className={`${feature.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Student Management System?
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Built specifically for educational institutions with modern technology and user-friendly design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-indigo-100 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of educational institutions that have streamlined their operations 
            with our comprehensive student management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg hover:border-gray-500 hover:text-white transition-colors flex items-center justify-center space-x-2 text-lg font-semibold">
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">SMS ERP</h3>
                <p className="text-sm text-gray-400">Student Management System</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Student Management System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;