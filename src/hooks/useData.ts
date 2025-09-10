import { useState, useEffect } from 'react';
import { Student, FeeRecord, HostelRoom, ExamRecord } from '../types';

// Empty arrays for fresh start
const mockStudents: Student[] = [];

const mockFeeRecords: FeeRecord[] = [];

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

const mockExamRecords: ExamRecord[] = [];

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