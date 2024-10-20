// import Dashboard from "../../components/Student/Dashboard/DashStdn";
import Dashboard from "../../components/Student/Dashboard/DashStdn";
import AuthGoogle from "@/app/components/root/AuthGoogle";
export default function DashboardPage() {
  return (
    <AuthGoogle>
      <Dashboard />
    </AuthGoogle>
  );
}
