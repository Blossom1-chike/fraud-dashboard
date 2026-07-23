import type {ReactNode} from 'react'
import Sidebar from '@/components/Sidebar';

type Props = {
    children: ReactNode;
}
const DashboardLayout = ({children}: Props) => {
  return (
    <div className="bg-bg flex overflow-hidden shadow-[0_4px_24px_rgba(35,38,32,0.08)] min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0 py-[26px] px-[30px] text-ink font-sans">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
