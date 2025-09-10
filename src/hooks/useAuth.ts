import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@college.edu',
    role: 'admin',
    permissions: ['admissions', 'fees', 'hostel', 'dashboard', 'users'] // Admin: add students, fees, allocate hostel
  },
  {
    id: '2',
    name: 'Staff Member',
    email: 'staff@college.edu',
    role: 'staff',
    permissions: ['exams', 'students_list'] // Staff: add marks, see student list
  },
  {
    id: '3',
    name: 'Tanay Mahajan',
    email: 'tanay.mahajan@university.edu',
    role: 'student',
    permissions: ['my_fees', 'my_grades'] // Student: see their fees and grades only
  },
  {
    id: '4',
    name: 'Aditya Jagdale',
    email: 'aditya.jagdale@university.edu',
    role: 'student',
    permissions: ['my_fees', 'my_grades']
  },
  {
    id: '5',
    name: 'Siddharth Farkade',
    email: 'siddharth.farkade@university.edu',
    role: 'student',
    permissions: ['my_fees', 'my_grades']
  }
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  return {
    user,
    login,
    logout,
    hasPermission
  };
};

export { AuthContext };