"use client";

import React from 'react';
import { 
  FaQrcode, 
  FaUserShield, 
  FaChalkboardTeacher, 
  FaUserCheck, 
  FaBell, 
  FaChartBar, 
  FaFileAlt, 
  FaReact, 
  FaDatabase, 
  FaMobile 
} from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200">
    <div className="card-body">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="card-title text-lg">{title}</h3>
      </div>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);

const TeamMember = ({ name, role, description }) => (
  <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200">
    <div className="card-body">
      <h3 className="card-title text-xl text-primary">{name}</h3>
      <p className="font-medium text-secondary">{role}</p>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const features = [
    {
      icon: FaQrcode,
      title: "Dynamic QR Code System",
      description: "Secure 5-second rotating QR codes for accurate attendance tracking and fraud prevention"
    },
    {
      icon: FaUserShield,
      title: "Google Authentication",
      description: "Secure OAuth login system for both students and lecturers using institutional Google accounts"
    },
    {
      icon: FaChalkboardTeacher,
      title: "Lecture Management",
      description: "Comprehensive tools for creating, scheduling, and managing lecture halls and classes"
    },
    {
      icon: FaUserCheck,
      title: "Multiple Attendance Options",
      description: "Support for QR-based attendance and manual verification by lecturers"
    },
    {
      icon: FaBell,
      title: "Smart Notifications",
      description: "Real-time alerts for upcoming classes and successful attendance marking"
    },
    {
      icon: FaChartBar,
      title: "Analytics Dashboard",
      description: "Real-time attendance tracking and participation analytics for informed decision-making"
    },
    {
      icon: FaFileAlt,
      title: "Comprehensive Reports",
      description: "Downloadable attendance reports lecturers"
    }
  ];

  const team = [
    {
      name: "Shalitha M. Gamage",
      role: "Fullstack Developer",
      description: "Expert in building secure, scalable applications with modern web technologies."
    },
    {
      name: "Thimira Pathirana",
      role: "Frontend Developer",
      description: "Specializes in creating responsive and user-friendly interfaces using React."
    },
    {
      name: "Tharushi Weerasinghe",
      role: "UI/UX Designer",
      description: "Focuses on creating intuitive and accessible user experiences."
    },
    {
      name: "Miyuru Gunawardhana",
      role: "Frontend Developer",
      description: "Skilled in implementing modern frontend solutions ."
    },
    {
      name: "Anuhas Kalupahana",
      role: "Software Tester",
      description: "Ensures quality through comprehensive black box and white box testing."
    },
    {
      name: "Divantha Ambrose",
      role: "UI/UX Designer",
      description: "Creates engaging user interfaces with focus on usability and aesthetics."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="badge badge-primary badge-lg gap-2 mb-4">
            <FaQrcode className="w-4 h-4" />
            RUSL Faculty of Technology
          </div>
          <h1 className="text-5xl font-bold text-primary">Student Attendance & Lecture Management System</h1>
          <p className="max-w-3xl mx-auto text-xl text-base-content/70">
            A Progressive Web Application designed to streamline attendance tracking and lecture management 
            through secure QR technology and real-time analytics.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-primary">Built With Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="badge badge-outline gap-2">
              <FaReact /> Next.js
            </div>
            <div className="badge badge-outline gap-2">
              <FaReact /> React.js
            </div>
            <div className="badge badge-outline gap-2">
              <FaDatabase /> MongoDB
            </div>
            <div className="badge badge-outline gap-2">
              <FaReact /> Tailwind CSS
            </div>
            <div className="badge badge-outline gap-2">
              <FaMobile /> Progressive Web App
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-primary">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">Development Team</h2>
            <p className="max-w-2xl mx-auto text-base-content/70">
              A dedicated team of Technology Faculty students working together to revolutionize 
              attendance management at Rajarata University of Sri Lanka.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>    
        </div>
      </div>
    </div>
  );
}