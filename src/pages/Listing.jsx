import React from 'react';
import { useNavigate } from 'react-router-dom';

// Static patient data
const patients = [
  { id: 1, name: 'Patient 1 ', lastMessage: 'Hey, how are you?', time: '10:30 AM', active: true },
  { id: 2, name: 'Jane Smith', lastMessage: 'Appointment tomorrow?', time: '9:15 AM', active: false },
  { id: 3, name: 'Michael Brown', lastMessage: 'Thanks for the update!', time: 'Yesterday', active: false },
  { id: 4, name: 'Emily Davis', lastMessage: 'Can we reschedule?', time: 'Yesterday', active: false },
];

const Listing = () => {
  const navigate = useNavigate();

  const handlePatientClick = (patient) => {
    if (patient.active) {
      navigate('/consultation', { state: { patientName: patient.name } });
    }
  };

  return (
    <div className="h-screen bg-[#ECE5DD] flex flex-col">
      {/* Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-medium tracking-wide">HealthConnect</h1>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-[#064e45] rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4a2 2 0 012-2h10a2 2 0 012 2v4h-4m-2 4h.01M12 20h.01" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#064e45] rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto bg-[#ECE5DD]">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`flex items-center p-4 border-b border-gray-200 ${
              patient.active
                ? 'hover:bg-[#f0f0f0] cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handlePatientClick(patient)}
          >
            <div className="w-12 h-12 bg-[#B0BEC5] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">{patient.name[0]}</span>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-900">{patient.name}</h2>
                <span className="text-xs text-gray-500">{patient.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{patient.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-4 flex justify-around border-t border-gray-200 shadow-inner">
        <button className="flex flex-col items-center text-[#075E54] hover:text-[#064e45]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4a2 2 0 012-2h10a2 2 0 012 2v4h-4m-2 4h.01M12 20h.01" />
          </svg>
          <span className="text-xs mt-1 font-medium">Chat</span>
        </button>
        <button className="flex flex-col items-center text-[#075E54] hover:text-[#064e45]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs mt-1 font-medium">Audio</span>
        </button>
        <button className="flex flex-col items-center text-[#075E54] hover:text-[#064e45]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1 font-medium">Video</span>
        </button>
      </div>
    </div>
  );
};

export default Listing;