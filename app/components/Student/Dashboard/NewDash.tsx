import React from 'react';
import { FaUser, FaFolder, FaBell, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVideo, FaClock, FaChalkboardTeacher } from 'react-icons/fa';

interface ClassCardProps {
   title: string;
   instructor: string;
   year: string;
   color: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, instructor, year, color }) => (
   <div className={`card shadow-xl mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${color}`}>
      <div className="card-body">
         <h2 className="card-title text-lg">{title}</h2>
         <p className="text-sm opacity-70">{year}</p>
         <p className="text-sm opacity-70">{instructor}</p>
         <div className="card-actions justify-end mt-2">
            <button className="btn btn-square btn-sm">
               <FaUser className="h-4 w-4" />
            </button>
            <button className="btn btn-square btn-sm">
               <FaFolder className="h-4 w-4" />
            </button>
         </div>
      </div>
   </div>
);

const UserProfile: React.FC = () => (
   <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
      <div className="card-body">
         <div className="flex items-center mb-4">
            <div className="avatar placeholder mr-4">
               <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                  <span className="text-3xl">U</span>
               </div>
            </div>
            <div>
               <h2 className="card-title">John Doe</h2>
               <p className="opacity-70">Student ID: 12345</p>
            </div>
         </div>
         <div className="space-y-2">
            <p className="flex items-center"><FaEnvelope className="mr-2" /> john.doe@example.com</p>
            <p className="flex items-center"><FaPhone className="mr-2" /> +1 234 567 8900</p>
            <p className="flex items-center"><FaUser className="mr-2" /> Computer Science, Year 2</p>
         </div>
      </div>
   </div>
);

interface UpcomingLectureProps {
   name: string;
   code: string;
   time: string;
   lecturer: string;
   isOnline: boolean;
   link: string;
}

const UpcomingLecture: React.FC<UpcomingLectureProps> = ({ name, code, time, lecturer, isOnline, link }) => (
   <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
      <div className="card-body">
         <div className="flex justify-between items-start">
            <div>
               <h2 className="card-title text-2xl font-bold mb-2">Next Lecture</h2>
               <p className="text-xl font-semibold">{name}</p>
               <p className="text-lg opacity-90">{code}</p>
            </div>
            <div className="text-right">
               <div className="bg-white text-blue-600 rounded-full p-3 inline-block">
                  {isOnline ? <FaVideo size={24} /> : <FaMapMarkerAlt size={24} />}
               </div>
               <p className="mt-2 font-medium">{isOnline ? 'Online' : 'On Campus'}</p>
            </div>
         </div>
         <div className="mt-4 space-y-2">
            <p className="flex items-center"><FaClock className="mr-2" /> {time}</p>
            <p className="flex items-center"><FaChalkboardTeacher className="mr-2" /> {lecturer}</p>
         </div>
         <div className="card-actions justify-end mt-4">
            <a href={link} target="_blank" rel="noopener noreferrer"
               className="btn btn-primary bg-white text-blue-600 hover:bg-blue-100 border-none">
               {isOnline ? 'Join Online' : 'View Location'}
            </a>
         </div>
      </div>
   </div>
);

interface Class {
   id: number;
   title: string;
   instructor: string;
   year: string;
   color: string;
}

const Dashboard: React.FC = () => {
   const classes: Class[] = [
      { id: 1, title: 'ICT 1209 - Web Technologies', instructor: 'Dhanushka SJ', year: '2021/2022', color: 'bg-blue-500 text-white' },
      { id: 2, title: 'ICT 1207 - Human Computer Interaction', instructor: 'Oshidhi Munasinghe', year: '2021/2022', color: 'bg-green-500 text-white' },
      { id: 3, title: 'CMT 1307-Mathematical Methods II', instructor: 'Yamani Palihakkara', year: '2021/2022', color: 'bg-yellow-500 text-white' },
      { id: 4, title: 'CMT 1301', instructor: 'Lalani Fernando', year: '2021/2022', color: 'bg-red-500 text-white' },
      { id: 5, title: 'Program Designing and Programming', instructor: 'Malki Jayawardhana', year: '2021/2022', color: 'bg-purple-500 text-white' },
      { id: 6, title: 'CMT 1303-Fundamentals of Physics', instructor: 'Yamani Palihakkara', year: '2021/2022', color: 'bg-pink-500 text-white' },
   ];

   const upcomingLecture: UpcomingLectureProps = {
      name: 'Web Technologies',
      code: 'ICT 1209',
      time: 'Today, 2:00 PM',
      lecturer: 'Dhanushka SJ',
      isOnline: true,
      link: 'https://zoom.us/j/example',
   };

   return (
      <div className="min-h-screen bg-base-200 p-4">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               <UserProfile />
               <UpcomingLecture {...upcomingLecture} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {classes.map((cls) => (
                  <ClassCard
                     key={cls.id}
                     title={cls.title}
                     instructor={cls.instructor}
                     year={cls.year}
                     color={cls.color}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;