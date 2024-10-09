"use client";

import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdClose } from "react-icons/md";
import { IconType } from 'react-icons';

interface Link {
   name: string;
   url: string;
   icon: IconType;
}

interface Developer {
   id: number;
   name: string;
   role: string;
   description: string;
   image: string;
   fullImage: string;
   links: Link[];
}

const developers: Developer[] = [
   {
      id: 1,
      name: 'Shalitha Maduwantha',
      role: 'Fullstack Developer',
      description: 'Versatile fullstack developer with expertise in both frontend and backend technologies.',
      image: '/profileimg/Shali.jpg',
      fullImage: '/profileimg/Shali.jpg',
      links: [
         { name: 'GitHub', url: 'https://github.com/shalithamadhuwantha', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shalitha-madhuwantha/', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:bbsmgamage@gmail.com', icon: MdEmail }
      ]
   },
   {
      id: 2,
      name: 'Thimira Pathirana',
      role: 'Frontend Developer',
      description: 'Skilled frontend developer specializing in creating responsive and user-friendly web applications.',
      image: '/profileimg/thimi.jpg',
      fullImage: '/profileimg/thimi.jpg',
      links: [
         { name: 'GitHub', url: 'https://github.com/Thimirapathirana159', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thimira-pathirana-552449234', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:pathiranathimea@gmail.com', icon: MdEmail }
      ]
   },
   {
      id: 3,
      name: 'Miyuru Haitha',
      role: 'Frontend Developer',
      description: 'Creative frontend developer focused on building intuitive and visually appealing user interfaces.',
      image: '/profileimg/miyu.jpg',
      fullImage: '/profileimg/miyu.jpg',
      links: [
         { name: 'GitHub', url: 'https://github.com/MiyuruH', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/miyuruh', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:mailto:miyuruh628@gmail.com', icon: MdEmail }
      ]
   },
   {
      id: 4,
      name: 'Tharushi Weerasinghe',
      role: 'UI/UX Designer',
      description: 'Innovative UI/UX designer dedicated to creating intuitive and visually stunning user experiences.',
      image: 'https://api.dicebear.com/6.x/initials/svg?seed=TW',
      fullImage: 'https://api.dicebear.com/6.x/personas/svg?seed=TW',
      links: [
         { name: 'GitHub', url: 'https://github.com/tharushiweerasinghe2002', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tharushi-weerasinghe-71276b2a3/', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:tharushiweerasinghe23@gmail.com', icon: MdEmail }
      ]
   },
   {
      id: 5,
      name: 'Divantha Ambrose',
      role: 'UI/UX Designer',
      description: 'Talented UI/UX designer with a keen eye for detail and a passion for creating engaging digital experiences.',
      image: 'https://api.dicebear.com/6.x/initials/svg?seed=DA',
      fullImage: 'https://api.dicebear.com/6.x/personas/svg?seed=DA',
      links: [
         { name: 'GitHub', url: 'https://github.com/divantha', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/divantha-ambrose-9aa126247/', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:sirusadivantha@gmail.com', icon: MdEmail }
      ]
   },
   {
      id: 6,
      name: 'Anuhas Kalupahana',
      role: 'Software Tester',
      description: 'Meticulous software tester with a strong focus on quality assurance and bug detection.',
      image: '/profileimg/anu.jpg',
      fullImage: '/profileimg/anu.jpg',
      links: [
         { name: 'GitHub', url: 'https://github.com/anuhas442', icon: FaGithub },
         { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anuhas-kalupahana-240127202/', icon: FaLinkedin },
         { name: 'Email', url: 'mailto:anuhas442@gmail.com', icon: MdEmail }
      ]
   }
];

// Create a wrapper component for icons
const IconWrapper: React.FC<{ icon: IconType; className?: string }> = ({ icon: Icon, className }) => {
   return <Icon className={className} />;
};

export default function DeveloperPage() {
   const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

   const handleShowModal = (developer: Developer) => {
      setSelectedDeveloper(developer);
   };

   const handleHideModal = () => {
      setSelectedDeveloper(null);
   };

   return (
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
         <h1 className="text-3xl font-bold mb-8 text-center text-white">Meet Our Team</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {developers.map((developer: Developer) => (
               <div key={developer.id} className="card bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <figure className="px-10 pt-10">
                     <img src={developer.image} alt={developer.name} className="rounded-full w-32 h-32 object-cover" />
                  </figure>
                  <div className="card-body items-center text-center">
                     <h2 className="card-title text-2xl font-bold text-white">{developer.name}</h2>
                     <p className="text-sm font-medium text-indigo-300">{developer.role}</p>
                     <p className="text-sm text-gray-300 mt-2">{developer.description}</p>
                     <div className="card-actions mt-4">
                        <button className="btn btn-primary" onClick={() => handleShowModal(developer)}>View Profile</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         {selectedDeveloper && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleHideModal}>
               <div className="modal-box bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 max-w-3xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col md:flex-row items-center">
                     <img src={selectedDeveloper.fullImage} alt={selectedDeveloper.name} className="rounded-lg w-64 h-64 object-cover mb-4 md:mb-0 md:mr-6" />
                     <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="font-bold text-2xl text-white">{selectedDeveloper.name}</h3>
                           <button onClick={handleHideModal} className="btn btn-circle btn-ghost">
                              <IconWrapper icon={MdClose} className="w-6 h-6" />
                           </button>
                        </div>
                        <p className="text-sm font-medium text-indigo-300 mb-4">{selectedDeveloper.role}</p>
                        <p className="py-4 text-gray-300">{selectedDeveloper.description}</p>
                        <div className="flex space-x-4 my-4">
                           {selectedDeveloper.links.map((link: Link, index: number) => (
                              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline btn-primary p-0 flex items-center justify-center">
                                 <span className="w-5 h-5">
                                    <IconWrapper icon={link.icon} className="w-full h-full" />
                                 </span>
                              </a>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}