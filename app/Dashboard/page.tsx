import React from 'react';
// ----------------------

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-[15rem_auto] w-[96%] mx-auto gap-7">
      <aside className="h-screen">
        <div className="bg-white flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <img src="./Images/logo.png" alt="logo" className="w-8 h-8" />
            <h2 className="font-bold text-xl">SA <span className="text-red-500">&</span> LMS</h2>
          </div>
          <div id="close-btn" className="hidden">
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className="bg-white flex flex-col h-[86vh] mt-12 relative">
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out active:bg-gray-100 active:text-blue-500 active:ml-0">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">grid_view</span>
            <h3 className="font-medium">Dashboard</h3>
          </a>
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out hover:text-blue-500">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">school</span>
            <h3 className="font-medium">My Courses</h3>
          </a>
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out hover:text-blue-500">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">assignment</span>
            <h3 className="font-medium">Assignments</h3>
          </a>
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out hover:text-blue-500">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">event_note</span>
            <h3 className="font-medium">Time Table</h3>
          </a>
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out hover:text-blue-500">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">settings</span>
            <h3 className="font-medium">Settings</h3>
          </a>
          <a href="#" className="flex text-gray-600 ml-8 gap-4 items-center relative h-[3.7rem] transition-all duration-300 ease-in-out hover:text-blue-500 absolute bottom-8 w-full">
            <span className="material-icons-sharp text-2xl transition-all duration-300 ease-in-out">logout</span>
            <h3 className="font-medium">Logout</h3>
          </a>
        </div>
      </aside>

      <main className="mt-6">
        <div className="flex justify-between gap-8">
          <h1 className="font-extrabold text-2xl">Dashboard</h1>
          <div className="flex gap-8">
            <button id="menu-btn" type="button">
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div className="bg-gray-200 flex items-center h-6 w-16 rounded-sm cursor-pointer">
              <span className="material-symbols-outlined text-xl bg-blue-500 text-white w-1/2 h-full flex items-center justify-center rounded-sm">light_mode</span>
              <span className="material-symbols-outlined text-xl w-1/2 h-full flex items-center justify-center">dark_mode</span>
            </div>
            <div className="flex gap-8 text-right">
              <div className="flex flex-col">
                <p>Hey, <b>John</b></p>
                <small className="text-gray-500">User</small>
              </div>
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img src="./Images/profile-1.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-white p-7 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-none">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl">verified</span>
              <h3 className="font-semibold text-lg">Student ID</h3>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl">ITT / 2022 / 000</h1>
            </div>
            <small className="text-gray-500">########</small>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-none">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl">assignment</span>
              <h3 className="font-semibold text-lg">Assignment</h3>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl">000</h1>
            </div>
            <small className="text-gray-500">########</small>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-none">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl">calendar_today</span>
              <h3 className="font-semibold text-lg">Lecture</h3>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl">000</h1>
            </div>
            <small className="text-gray-500">########</small>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl mb-3">Recent Work</h2>
          <table className="bg-white w-full rounded-2xl p-7 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-none">
            <thead>
              <tr>
                <th>No.</th>
                <th>Course</th>
                <th>Course Code</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item} className="border-b border-gray-200">
                  <td>01</td>
                  <td>Programming</td>
                  <td>ITT101</td>
                  <td className="text-yellow-500">Pending</td>
                  <td className="text-blue-500">Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
