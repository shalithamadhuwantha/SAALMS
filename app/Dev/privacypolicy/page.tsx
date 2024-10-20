import React from 'react';
import { RiFileListLine, RiShieldUserLine, RiUserSettingsLine, RiBookOpenLine, RiBarChartBoxLine, RiMailOpenLine } from 'react-icons/ri';

const PrivacyPolicyPreview = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: <RiFileListLine className="w-6 h-6" />,
      content: [
        "Personal information (name, email, contact details)",
        "Academic records and performance data",
        "Attendance records",
        "Course enrollment and progress information",
        "Learning activities and interactions within the system"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <RiUserSettingsLine className="w-6 h-6" />,
      content: [
        "Manage student profiles and academic records",
        "Track and manage student attendance",
        "Facilitate course delivery and monitor progress",
        "Generate analytics to improve learning outcomes",
        "Communicate important information about attendance, courses, or your account"
      ]
    },
    {
      title: "Data Security",
      icon: <RiShieldUserLine className="w-6 h-6" />,
      content: [
        "SAALMS implements robust security measures to protect your personal, academic, and attendance information, including encryption, access controls, and regular security audits."
      ]
    },
    {
      title: "Your Rights",
      icon: <RiBookOpenLine className="w-6 h-6" />,
      content: [
        "You have the right to access, correct, or delete your personal information. You can manage much of your data directly through your SAALMS account settings. For attendance-related inquiries, please contact your institution's administrator."
      ]
    },
    {
      title: "Changes to This Policy",
      icon: <RiBarChartBoxLine className="w-6 h-6" />,
      content: [
        "We may update this privacy policy from time to time. We will notify users of any material changes by posting the new policy on this page."
      ]
    },
    {
      title: "Contact Us",
      icon: <RiMailOpenLine className="w-6 h-6" />,
      content: [
        "If you have any questions about this privacy policy or our data practices, please contact us at [insert SAALMS contact email or form]."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
      <h1 className="bg-gradient-to-br from-indigo-900 via-fuchsia-800 to-purple-900 bg-clip-text text-transparent opacity-80 shadow-xl text-4xl font-extrabold text-center p-4">
    SAALMS Privacy Policy
</h1>

        <p className="text-lg mb-8 text-center text-gray-300">
          SAALMS (Student Attendant And Learning Management System) is committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and safeguard your information when you use our system.
        </p>
        
        {sections.map((section, index) => (
          <div key={index} className="mb-8 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              {section.icon}
              <h2 className="text-2xl font-semibold ml-3">{section.title}</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              {section.content.map((item, idx) => (
                <li key={idx} className="text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        ))}
        
        <p className="text-sm text-center text-gray-400 mt-8">
          Last Updated: [20/13/2024]
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPreview;