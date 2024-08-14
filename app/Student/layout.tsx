import SideNavStdn from './../components/Student/SideNvStdn';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex h-screen bg-gray-900 ">
         <SideNavStdn />
         <div className="flex-1 overflow-auto">
            {children}
         </div>
      </div>
   );
}