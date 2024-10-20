import SideNavStdn from "./../components/Student/SideNvStdn";
import AuthGoogle from "../components/root/AuthGoogle";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGoogle>
      <div className="flex h-screen bg-gray-900 ">
        <SideNavStdn />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </AuthGoogle>
  );
}
