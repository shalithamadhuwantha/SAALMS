import AuthGoogle from '../components/root/AuthGoogle';
import SideNvLec from './../components/Lecturer/SideNvLec';


export default function StudentLayout({ children }: { children: React.ReactNode }) {
   return (
      <AuthGoogle>
      <div className="flex h-screen bg-gray-900 ">
         <SideNvLec />
         <div className="flex-1 overflow-auto">
            {children}
         </div>
      </div>
      </AuthGoogle>
   );
}