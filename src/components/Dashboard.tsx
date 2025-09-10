import React from 'react';
import { Users, DollarSign, Building, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { useData } from '../hooks/useData';

const Dashboard: React.FC = () => {
  const { students, feeRecords, hostelRooms, examRecords } = useData();

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    totalFees: feeRecords.reduce((sum, fee) => sum + fee.amount, 0),
    paidFees: feeRecords.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.amount, 0),
    pendingFees: feeRecords.filter(fee => fee.status === 'pending').length,
    overdueFees: feeRecords.filter(fee => fee.status === 'overdue').length,
    totalRooms: hostelRooms.length,
    occupiedRooms: hostelRooms.filter(room => room.occupied > 0).length,
    availableRooms: hostelRooms.filter(room => room.occupied < room.capacity).length,
    totalExams: examRecords.length,
    avgMarks: examRecords.reduce((sum, exam) => sum + (exam.marks / exam.totalMarks) * 100, 0) / examRecords.length || 0
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
  }> = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Total Fees Collected"
          value={`₹${stats.paidFees.toLocaleString()}`}
          icon={DollarSign}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Hostel Occupancy"
          value={`${Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}%`}
          icon={Building}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <StatCard
          title="Average Grade"
          value={`${stats.avgMarks.toFixed(1)}%`}
          icon={TrendingUp}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Students</span>
              <span className="text-green-600 font-semibold">{stats.activeStudents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Enrolled</span>
              <span className="text-blue-600 font-semibold">{stats.totalStudents}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(stats.activeStudents / stats.totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Fee Collection Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fee Collection</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Collected</span>
              <span className="text-green-600 font-semibold">₹{stats.paidFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Due</span>
              <span className="text-blue-600 font-semibold">₹{stats.totalFees.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(stats.paidFees / stats.totalFees) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Alerts & Notifications</h2>
        <div className="space-y-3">
          {stats.pendingFees > 0 && (
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
              <span className="text-yellow-800">
                {stats.pendingFees} fee payment{stats.pendingFees > 1 ? 's' : ''} pending
              </span>
            </div>
          )}
          {stats.overdueFees > 0 && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">
                {stats.overdueFees} overdue fee payment{stats.overdueFees > 1 ? 's' : ''}
              </span>
            </div>
          )}
          {stats.availableRooms > 0 && (
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
              <Building className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-blue-800">
                {stats.availableRooms} hostel room{stats.availableRooms > 1 ? 's' : ''} available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;