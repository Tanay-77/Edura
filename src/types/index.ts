export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  course: string;
  year: string;
  admissionDate: string;
  studentId: string;
  status: 'active' | 'inactive' | 'graduated';
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'tuition' | 'hostel' | 'examination' | 'library' | 'other';
  receiptNumber?: string;
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  students: string[];
  type: 'single' | 'double' | 'triple' | 'quad';
  fees: number;
}

export interface ExamRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment';
  marks: number;
  totalMarks: number;
  grade: string;
  examDate: string;
  semester: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'student';
  permissions: string[];
}