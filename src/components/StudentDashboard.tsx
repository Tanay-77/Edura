import React from 'react';
import { IndianRupee, FileText, User, Calendar } from 'lucide-react';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, feeRecords, examRecords } = useData();

  // Find current student data
  const currentStudent = students.find(s => s.email === user?.email);
  
  // Get student's fee records
  const studentFees = feeRecords.filter(fee => fee.studentId === currentStudent?.id);
  const pendingFees = studentFees.filter(fee => fee.status === 'pending');
  const paidFees = studentFees.filter(fee => fee.status === 'paid');
  const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = paidFees.reduce((sum, fee) => sum + fee.amount, 0);

  // Get student's exam records
  const studentExams = examRecords.filter(exam => exam.studentId === currentStudent?.id);
  const averageScore = studentExams.length > 0 
    ? studentExams.reduce((sum, exam) => sum + (exam.marks / exam.totalMarks) * 100, 0) / studentExams.length
    : 0;

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

  if (!currentStudent) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Profile Not Found</h1>
          <p className="text-gray-600">Please contact the administrator to set up your student profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentStudent.name}!</h1>
          <p className="text-gray-600 mt-1">Student ID: {currentStudent.studentId} | {currentStudent.course} - {currentStudent.year}</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 ml-4">Student Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-gray-900">{currentStudent.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Phone</p>
            <p className="text-gray-900">{currentStudent.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Date of Birth</p>
            <p className="text-gray-900">{new Date(currentStudent.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Address</p>
            <p className="text-gray-900">{currentStudent.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Admission Date</p>
            <p className="text-gray-900">{new Date(currentStudent.admissionDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              currentStudent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {currentStudent.status}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Fees"
          value={`₹${totalPending.toLocaleString()}`}
          icon={IndianRupee}
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <StatCard
          title="Paid Fees"
          value={`₹${totalPaid.toLocaleString()}`}
          icon={IndianRupee}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore.toFixed(1)}%`}
          icon={FileText}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
      </div>

      {/* Fee Records */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Fee Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{fee.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : fee.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {studentFees.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No fee records found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Exam Records */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Exam Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{exam.examType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {exam.marks}/{exam.totalMarks}
                      <span className="ml-2 text-gray-500">
                        ({((exam.marks / exam.totalMarks) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      exam.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      exam.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                      exam.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                      exam.grade === 'F' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {exam.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(exam.examDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {studentExams.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No exam records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
