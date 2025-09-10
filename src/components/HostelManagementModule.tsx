import React, { useState } from 'react';
import { Building, Users, Plus, UserCheck } from 'lucide-react';
import { useData } from '../hooks/useData';

const HostelManagementModule: React.FC = () => {
  const { students, hostelRooms, assignHostelRoom } = useData();
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    roomId: '',
    studentId: ''
  });

  const handleAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    assignHostelRoom(assignmentData.roomId, assignmentData.studentId);
    setShowAssignForm(false);
    setAssignmentData({ roomId: '', studentId: '' });
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const unassignedStudents = students.filter(student => 
    !hostelRooms.some(room => room.students.includes(student.id))
  );

  const totalRooms = hostelRooms.length;
  const occupiedRooms = hostelRooms.filter(room => room.occupied > 0).length;
  const totalCapacity = hostelRooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = hostelRooms.reduce((sum, room) => sum + room.occupied, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
        <button
          onClick={() => setShowAssignForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2 transition-colors"
        >
          <UserCheck className="w-5 h-5" />
          <span>Assign Room</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">{totalOccupied}/{totalCapacity}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round((totalOccupied / totalCapacity) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Room Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {hostelRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">Room {room.roomNumber}</h3>
                    <p className="text-sm text-gray-600 capitalize">{room.type}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    room.occupied === 0
                      ? 'bg-green-100 text-green-800'
                      : room.occupied < room.capacity
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.occupied === 0 ? 'Available' : room.occupied < room.capacity ? 'Partial' : 'Full'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Occupancy:</span>
                    <span className="font-medium">{room.occupied}/{room.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Fee:</span>
                    <span className="font-medium">₹{room.fees}</span>
                  </div>
                  
                  {room.students.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Residents:</p>
                      <div className="space-y-1">
                        {room.students.map(studentId => (
                          <div key={studentId} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            {getStudentName(studentId)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full ${
                      room.occupied === 0
                        ? 'bg-green-500'
                        : room.occupied < room.capacity
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unassigned Students */}
      {unassignedStudents.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Unassigned Students ({unassignedStudents.length})</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unassignedStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Unassigned
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Room Assignment Form Modal */}
      {showAssignForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Assign Room</h2>
            </div>
            
            <form onSubmit={handleAssignment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student *
                </label>
                <select
                  required
                  value={assignmentData.studentId}
                  onChange={(e) => setAssignmentData({...assignmentData, studentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Choose a student</option>
                  {unassignedStudents.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Available Room *
                </label>
                <select
                  required
                  value={assignmentData.roomId}
                  onChange={(e) => setAssignmentData({...assignmentData, roomId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Choose a room</option>
                  {hostelRooms
                    .filter(room => room.occupied < room.capacity)
                    .map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.roomNumber} - {room.capacity - room.occupied} available ({room.type})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssignForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Assign Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelManagementModule;