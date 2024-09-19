"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MdOutlineDateRange,
  MdEdit,
  MdSave,
  MdCancel,
  MdPersonOutline,
  MdEmail,
  MdSchool,
  MdBusinessCenter,
  MdDateRange,
  MdPhone,
} from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Settings = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    _id: "66d4c269b2851b8d863c9ecc",
    name: "John Doe",
    email: "john.doe@example.com",
    profileid: "ITT / 2022 / 000",
    faculty: "Computer Science",
    university: "Rajarata University",
    joined: "2024/10/21",
  });

  useEffect(() => {
    // load user data from the database
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/student/Profilegrab", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "bbsmgamagest@gmail.com" }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setProfile({
          _id: data._id || "N/A",
          name: data.name || "N/A",
          email: data.email || "N/A",
          profileid: data._id || "N/A",
          faculty: data.faculty || "N/A",
          university: data.university || "N/A",
          joined: new Date(data.createdAt).toLocaleDateString() || "N/A",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const UpshUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);

    const updatedProfile = {
      _id: profile._id,
      name: profile.name,
      email: profile.email,
      profileid: profile.profileid,
      faculty: profile.faculty,
      university: profile.university,
      image: session?.user?.image || "/img/logo.png", // Get profile picture from session
    };

    try {
      const response = await fetch("/api/student/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        // If the response is not ok, display the error message from the API
        toast(result.message, {
          icon: "❌",
          style: {
            background: "#0f172a",
            color: "#fff",
          },
        });
        return;
      }

      // Show success message if profile is updated successfully
      toast("Profile updated successfully!", {
        icon: "✅",
        style: {
          background: "#0f172a",
          color: "#fff",
        },
      });

      setProfile({
        _id: result._id || "N/A",
        name: result.name || "N/A",
        email: result.email || "N/A",
        profileid: result._id || "N/A",
        faculty: result.faculty || "N/A",
        university: result.university || "N/A",
        joined: new Date(result.createdAt).toLocaleDateString() || "N/A",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    UpshUpdate(e); // Call update function
    console.log("Updated profile:", profile);
  };

  return (
    <main className="col-span-4 p-4 sm:p-6 bg-gray-900 text-white flex flex-col overflow-auto">
      <div className="bg-gray-800 rounded-xl p-4 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

        <div className="relative z-10">
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 relative mb-4 sm:mb-0">
              Profile Settings
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg text-sm sm:text-base"
              >
                <MdEdit className="text-lg sm:text-xl" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src={session?.user?.image || "/img/logo.png"}
                    alt="User profile"
                    width={96}
                    height={96}
                    className="sm:w-24 sm:h-24 object-cover rounded-full"
                    layout="intrinsic"
                    priority
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {[
                  {
                    icon: MdPersonOutline,
                    name: "name",
                    label: "Name",
                    color: "text-blue-400",
                    editable: true,
                  },
                  {
                    icon: MdSchool,
                    name: "profileid",
                    label: "Profile ID",
                    color: "text-purple-400",
                    editable: false,
                  },
                  {
                    icon: MdEmail,
                    name: "email",
                    label: "Email",
                    color: "text-green-400",
                    editable: true,
                  },
                  {
                    icon: MdBusinessCenter,
                    name: "faculty",
                    label: "Faculty",
                    color: "text-pink-400",
                    editable: true,
                  },
                  {
                    icon: FaUniversity,
                    name: "university",
                    label: "University",
                    color: "text-yellow-400",
                    editable: true,
                  },
                  {
                    icon: MdDateRange,
                    name: "joined",
                    label: "Joined",
                    color: "text-indigo-400",
                    editable: false,
                  },
                ].map((field, index) => (
                  <div key={index} className="flex items-center">
                    <field.icon className={`mr-3 ${field.color}`} />
                    <label className="flex-grow">
                      <span className="block font-semibold text-white mb-1">
                        {field.label}
                      </span>
                      {isEditing && field.editable ? (
                        <input
                          type="text"
                          name={field.name}
                          value={profile[field.name as keyof typeof profile]}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="block bg-gray-800 text-white p-2 rounded-lg">
                          {profile[field.name as keyof typeof profile] || "N/A"}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
                  >
                    <MdCancel className="text-lg" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
                  >
                    <MdSave className="text-lg" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
