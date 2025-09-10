import React, { useState } from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AdmissionsModule from './components/AdmissionsModule';
import FeeManagementModule from './components/FeeManagementModule';
import HostelManagementModule from './components/HostelManagementModule';
import ExaminationRecordsModule from './components/ExaminationRecordsModule';

function App() {
  const authProps = useAuthProvider();
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const renderModule = () => {
    switch (currentModule) {
      case 'admissions':
        return <AdmissionsModule />;
      case 'fees':
        return <FeeManagementModule />;
      case 'hostel':
        return <HostelManagementModule />;
      case 'exams':
        return <ExaminationRecordsModule />;
      default:
        return <Dashboard />;
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!authProps.user) {
    return (
      <AuthContext.Provider value={authProps}>
        <div>
          <button
            onClick={() => setShowLanding(true)}
            className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium z-10"
          >
            ← Back to Home
          </button>
          <LoginForm />
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authProps}>
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={() => setShowLanding(true)}
          className="fixed top-4 left-4 bg-white text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded-md shadow-sm text-sm font-medium z-50 lg:left-72"
        >
          ← Home
        </button>
        <Navigation
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <div className="lg:pl-64">
          <main className="min-h-screen">
            {renderModule()}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;