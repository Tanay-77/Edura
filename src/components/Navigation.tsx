import React from 'react';
import { 
  Users, 
  DollarSign, 
  Building, 
  FileText, 
  BarChart3, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  currentModule: string;
  setCurrentModule: (module: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentModule,
  setCurrentModule,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { user, logout, hasPermission } = useAuth();

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, permission: 'dashboard' },
    { id: 'admissions', name: 'Admissions', icon: Users, permission: 'admissions' },
    { id: 'fees', name: 'Fee Management', icon: DollarSign, permission: 'fees' },
    { id: 'hostel', name: 'Hostel Management', icon: Building, permission: 'hostel' },
    { id: 'exams', name: 'Examination Records', icon: FileText, permission: 'exams' }
  ];

  const availableModules = modules.filter(module => hasPermission(module.permission));

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white p-2 rounded-md shadow-md"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-indigo-600 text-white">
            <h1 className="text-xl font-bold">SMS ERP</h1>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-2">
              {availableModules.map((module) => {
                const Icon = module.icon;
                const isActive = currentModule === module.id;
                
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setCurrentModule(module.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-6 w-6 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`} />
                    {module.name}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;