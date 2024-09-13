import AuthGoogle from '@/app/components/root/AuthGoogle';
import DashboardLec from '../../components/Lecturer/Dashboard/DashLec';


export default function DashboardPage() {
    return <AuthGoogle> <DashboardLec /> </AuthGoogle>;
}