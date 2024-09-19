'use client';

import React, { useState } from 'react';
import { MdEdit, MdSave, MdCancel, MdPersonOutline, MdEmail, MdSchool, MdBusinessCenter } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const LecturerSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Jane Smith',
    email: 'jane.smith@university.edu',
    staffId: 'STAFF2024001',
    department: 'Computer Science',
    position: 'Associate Professor',
    mobile: '+1234567890'
  });

  // Define a type for the keys of profile
  type ProfileKey = keyof typeof profile;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated profile:', profile);
  };

  return (
    <main className="col-span-4 p-4 sm:p-6 bg-gray-900 text-white flex flex-col overflow-auto">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300 relative mb-4 sm:mb-0">
              Edit Profile
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg text-sm sm:text-base"
              >
                <MdEdit className="text-lg sm:text-xl" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <FaUserCircle className="text-gray-500 w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {[
                  { icon: MdPersonOutline, name: 'name' as ProfileKey, label: 'Name', color: 'text-indigo-400', editable: true },
                  { icon: MdEmail, name: 'email' as ProfileKey, label: 'Email', color: 'text-green-400', editable: true },
                  { icon: MdSchool, name: 'staffId' as ProfileKey, label: 'Staff ID', color: 'text-purple-400', editable: false },
                  { icon: MdBusinessCenter, name: 'department' as ProfileKey, label: 'Department', color: 'text-pink-400', editable: true },
                  { icon: MdBusinessCenter, name: 'position' as ProfileKey, label: 'Position', color: 'text-yellow-400', editable: true },
                  { icon: MdPersonOutline, name: 'mobile' as ProfileKey, label: 'Mobile', color: 'text-orange-400', editable: true },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col space-y-1 sm:space-y-2 group">
                    <label htmlFor={field.name} className="text-xs sm:text-sm font-medium text-gray-400 flex items-center space-x-2">
                      <field.icon className={`${field.color} group-hover:scale-110 transition-transform duration-300`} />
                      <span>{field.label}</span>
                    </label>
                    <input
                      type={field.name === 'email' ? 'email' : field.name === 'mobile' ? 'tel' : 'text'}
                      id={field.name}
                      name={field.name}
                      value={profile[field.name as keyof typeof profile]}
                      onChange={handleInputChange}
                      disabled={!isEditing || !field.editable}
                      className={`bg-gray-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out shadow-inner text-sm sm:text-base w-full ${!field.editable ? 'cursor-not-allowed opacity-60' : ''}`}
                    />
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-1 sm:space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 shadow-lg text-sm sm:text-base"
                  >
                    <MdCancel className="text-lg sm:text-xl" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 sm:space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg text-sm sm:text-base"
                  >
                    <MdSave className="text-lg sm:text-xl" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LecturerSettings;