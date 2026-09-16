import type {ReactNode} from 'react';
import ProtectedPage from '@/components/auth/ProtectedPage';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default function Layout({children}: {children: ReactNode}) {
    return <ProtectedPage><DashboardShell>{children}</DashboardShell></ProtectedPage>;
}
