"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdPersonOutline,
  MdEmail,
  MdSchool,
  MdBusinessCenter,
  MdDateRange,
} from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";

const LecturerSettings = () => {
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


  // delete account notification and confirm
  const deleteLecturerAccount = async (email: string) => {
    try {
      const response = await fetch("/api/lecturer/del", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending the lecturer's email
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Deleted!",
          text: result.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        });
      } else {
        // Error handling (show error returned by the API)
        Swal.fire({
          title: "Error",
          text: result.message || "Failed to delete the lecturer account",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // Handle any network or unexpected errors
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handelDelProfile = () => {
    Swal.fire({
      title: "Are you sure?",
      html: `
      <p>Deleting your account will <strong>permanently remove all your classes and associated data</strong>.</p>
      <p>Please type <strong style="color: red;">'CONFIRM'</strong> to proceed.</p>
    `,
      icon: "warning",
      input: "text",
      inputPlaceholder: "Type CONFIRM",
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (value !== "CONFIRM") {
          return "You need to type 'CONFIRM'!";
        }
      },
      customClass: {
        popup:
          "gradient bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 shadow-xl text-white", // Reference the CSS class here
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === "CONFIRM") {
        deleteLecturerAccount(session?.user?.email || "");
      }
    });
  };


  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return; // Ensure email exists

      console.log("Session email: " + session?.user?.email);

      try {
        const response = await fetch("/api/lecturer/Profilegrab", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session?.user?.email }),
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

    // Only fetch profile if session is authenticated
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [session, status]); // Add 'status' as a dependency

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
      const response = await fetch("/api/lecturer/update", {
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
  // Define a type for the keys of profile
  type ProfileKey = keyof typeof profile;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);

    UpshUpdate(e);
    console.log("Updated profile:", profile);
  };

  return (
    <main className="col-span-4 p-4 sm:p-6 bg-gray-900 text-white flex flex-col overflow-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="bg-gray-800 rounded-xl p-4 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            {/* Left-aligned heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300 relative mb-4 sm:mb-0">
              Edit Profile
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h2>

            {/* Right-aligned buttons */}
            <div className="flex space-x-4">
              {" "}
              {/* Use 'space-x-4' to add space between buttons */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline btn-primary"
                >
                  <FaUserEdit className="text-lg sm:text-xl" />
                </button>
              )}
              <button
                className="btn btn-outline btn-error"
                onClick={handelDelProfile}
              >
                <RiDeleteBin5Line className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1 shadow-lg">
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
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col space-y-1 sm:space-y-2 group"
                  >
                    <label
                      htmlFor={field.name}
                      className="text-xs sm:text-sm font-medium text-gray-400 flex items-center space-x-2"
                    >
                      <field.icon
                        className={`${field.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span>{field.label}</span>
                    </label>
                    <input
                      type={
                        field.name === "email"
                          ? "email"
                          : field.name === "mobile"
                          ? "tel"
                          : "text"
                      }
                      id={field.name}
                      name={field.name}
                      value={profile[field.name as keyof typeof profile]}
                      onChange={handleInputChange}
                      disabled={!isEditing || !field.editable}
                      className={`bg-gray-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out shadow-inner text-sm sm:text-base w-full ${
                        !field.editable ? "cursor-not-allowed opacity-60" : ""
                      }`}
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
