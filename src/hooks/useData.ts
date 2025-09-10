import { useState } from 'react';
import { Student, FeeRecord, HostelRoom, ExamRecord } from '../types';

// Sample students for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU001',
    name: 'Tanay Mahajan',
    email: 'tanay.mahajan@university.edu',
    phone: '+91 98765 43210',
    dateOfBirth: '2002-05-15',
    address: 'Mumbai, Maharashtra',
    course: 'Computer Science',
    year: '3rd Year',
    status: 'active',
    admissionDate: '2023-08-15'
  },
  {
    id: '2',
    studentId: 'STU002',
    name: 'Aditya Jagdale',
    email: 'aditya.jagdale@university.edu',
    phone: '+91 98765 43211',
    dateOfBirth: '2003-08-22',
    address: 'Delhi, NCR',
    course: 'Physics',
    year: '2nd Year',
    status: 'active',
    admissionDate: '2023-08-15'
  },
  {
    id: '3',
    studentId: 'STU003',
    name: 'Siddharth Farkade',
    email: 'siddharth.farkade@university.edu',
    phone: '+91 98765 43212',
    dateOfBirth: '2001-12-10',
    address: 'Pune, Maharashtra',
    course: 'Chemistry',
    year: '4th Year',
    status: 'active',
    admissionDate: '2021-08-15'
  },
  {
    id: '4',
    studentId: 'STU004',
    name: 'Advait Kandelgaokar',
    email: 'Advait.kandelgaokar@university.edu',
    phone: '+91 98765 43213',
    dateOfBirth: '2004-03-18',
    address: 'Bangalore, Karnataka',
    course: 'Biology',
    year: '1st Year',
    status: 'active',
    admissionDate: '2024-08-15'
  },
    {
      id: '5',
      studentId: 'STU005',
    name: 'Pratik Kawade',
    email: 'Pratik.kawade@university.edu',
    phone: '+91 98765 43214',
    dateOfBirth: '2003-07-25',
    address: 'Nagpur, Maharashtra',
    course: 'Computer Science',
    year: '2nd Year',
    status: 'active',
    admissionDate: '2023-08-15'
    },
    {
      id: '6',
      studentId: 'STU006',
    name: 'Niyati Lokare',
    email: 'Niyati.lokare@university.edu',
    phone: '+91 98765 43215',
    dateOfBirth: '2004-11-08',
    address: 'Hyderabad, Telangana',
    course: 'Computer Science',
    year: '1st Year',
    status: 'active',
    admissionDate: '2024-08-15'
    }
];

const mockFeeRecords: FeeRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Tanay Mahajan',
    amount: 25000,
    dueDate: '2024-02-15',
    status: 'pending',
    type: 'tuition'
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Tanay Mahajan',
    amount: 5000,
    dueDate: '2024-01-30',
    status: 'paid',
    type: 'library',
    paidDate: '2024-01-25',
    receiptNumber: 'REC001'
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Aditya Jagdale',
    amount: 22000,
    dueDate: '2024-02-15',
    status: 'pending',
    type: 'tuition'
  },
  {
    id: '4',
    studentId: '2',
    studentName: 'Aditya Jagdale',
    amount: 3000,
    dueDate: '2024-01-20',
    status: 'paid',
    type: 'examination',
    paidDate: '2024-01-18',
    receiptNumber: 'REC002'
  },
  {
    id: '5',
    studentId: '3',
    studentName: 'Siddharth Farkade',
    amount: 24000,
    dueDate: '2024-02-15',
    status: 'pending',
    type: 'tuition'
  },
  {
    id: '6',
    studentId: '3',
    studentName: 'Siddharth Farkade',
    amount: 4000,
    dueDate: '2024-01-25',
    status: 'paid',
    type: 'hostel',
    paidDate: '2024-01-22',
    receiptNumber: 'REC003'
  }
];

const mockHostelRooms: HostelRoom[] = [
  {
    id: '1',
    roomNumber: 'A101',
    capacity: 2,
    occupied: 0,
    students: [],
    type: 'double',
    fees: 2000
  },
  {
    id: '2',
    roomNumber: 'A102',
    capacity: 2,
    occupied: 0,
    students: [],
    type: 'double',
    fees: 2000
  },
  {
    id: '3',
    roomNumber: 'A103',
    capacity: 2,
    occupied: 0,
    students: [],
    type: 'double',
    fees: 2000
  },
  {
    id: '4',
    roomNumber: 'B101',
    capacity: 1,
    occupied: 0,
    students: [],
    type: 'single',
    fees: 3000
  },
  {
    id: '5',
    roomNumber: 'B102',
    capacity: 3,
    occupied: 0,
    students: [],
    type: 'triple',
    fees: 1500
  }
];

const mockExamRecords: ExamRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Tanay Mahajan',
    subject: 'Mathematics',
    examType: 'midterm',
    marks: 85,
    totalMarks: 100,
    grade: 'A',
    examDate: '2024-01-15',
    semester: 'Fall 2024'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Aditya Jagdale',
    subject: 'Physics',
    examType: 'final',
    marks: 92,
    totalMarks: 100,
    grade: 'A+',
    examDate: '2024-01-20',
    semester: 'Fall 2024'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Siddharth Farkade',
    subject: 'Chemistry',
    examType: 'midterm',
    marks: 78,
    totalMarks: 100,
    grade: 'B+',
    examDate: '2024-01-18',
    semester: 'Fall 2024'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Advait Kandelgaokar',
    subject: 'Biology',
    examType: 'quiz',
    marks: 65,
    totalMarks: 100,
    grade: 'B',
    examDate: '2024-01-22',
    semester: 'Fall 2024'
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Pratik Kawade',
    subject: 'Computer Science',
    examType: 'assignment',
    marks: 45,
    totalMarks: 100,
    grade: 'C',
    examDate: '2024-01-25',
    semester: 'Fall 2024'
  },
  {
    id: '6',
    studentId: '1',
    studentName: 'Niyati Lokare',
    subject: 'English',
    examType: 'final',
    marks: 88,
    totalMarks: 100,
    grade: 'A',
    examDate: '2024-01-28',
    semester: 'Fall 2024'
  },
  {
    id: '7',
    studentId: '2',
    studentName: 'Aditya Jagdale',
    subject: 'History',
    examType: 'midterm',
    marks: 95,
    totalMarks: 100,
    grade: 'A+',
    examDate: '2024-01-30',
    semester: 'Fall 2024'
  },
  {
    id: '8',
    studentId: '3',
    studentName: 'Siddharth Farkade',
    subject: 'German',
    examType: 'quiz',
    marks: 35,
    totalMarks: 100,
    grade: 'F',
    examDate: '2024-02-01',
    semester: 'Fall 2024'
  }
];

export const useData = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(mockFeeRecords);
  const [hostelRooms, setHostelRooms] = useState<HostelRoom[]>(mockHostelRooms);
  const [examRecords, setExamRecords] = useState<ExamRecord[]>(mockExamRecords);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString()
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const addFeeRecord = (feeRecord: Omit<FeeRecord, 'id'>) => {
    const newFeeRecord: FeeRecord = {
      ...feeRecord,
      id: Date.now().toString()
    };
    setFeeRecords(prev => [...prev, newFeeRecord]);
    return newFeeRecord;
  };

  const payFee = (feeId: string) => {
    setFeeRecords(prev => prev.map(fee => 
      fee.id === feeId 
        ? { 
            ...fee, 
            status: 'paid' as const, 
            paidDate: new Date().toISOString().split('T')[0],
            receiptNumber: `REC${Date.now()}`
          }
        : fee
    ));
  };

  const assignHostelRoom = (roomId: string, studentId: string) => {
    setHostelRooms(prev => prev.map(room => {
      if (room.id === roomId && room.occupied < room.capacity) {
        return {
          ...room,
          occupied: room.occupied + 1,
          students: [...room.students, studentId]
        };
      }
      return room;
    }));
  };

  const addExamRecord = (examRecord: Omit<ExamRecord, 'id'>) => {
    const newExamRecord: ExamRecord = {
      ...examRecord,
      id: Date.now().toString()
    };
    setExamRecords(prev => [...prev, newExamRecord]);
    return newExamRecord;
  };

  return {
    students,
    feeRecords,
    hostelRooms,
    examRecords,
    addStudent,
    addFeeRecord,
    payFee,
    assignHostelRoom,
    addExamRecord
  };
};