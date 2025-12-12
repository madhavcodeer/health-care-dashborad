import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Activity,
    Users
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function DashboardLayout() {
    const [sidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-med-bg font-sans text-med-text flex overflow-hidden">

            {/* Sidebar - Minimal Floating */}
            <aside className={cn(
                "fixed top-4 left-4 bottom-4 bg-white rounded-3xl z-40 flex flex-col items-center py-6 shadow-soft transition-all duration-300",
                sidebarOpen ? "w-24" : "w-20"
            )}>
                <div className="mb-10 w-12 h-12 bg-med-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-med-primary/40">
                    M
                </div>

                <nav className="space-y-6 flex flex-1 flex-col items-center">
                    <NavLink to="/" className={({ isActive }) => cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", isActive ? "bg-med-primary text-white shadow-lg shadow-med-primary/30" : "text-med-muted hover:bg-med-bg")}>
                        <LayoutDashboard className="w-6 h-6" />
                    </NavLink>
                    <NavLink to="/departments" className={({ isActive }) => cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", isActive ? "bg-med-primary text-white shadow-lg shadow-med-primary/30" : "text-med-muted hover:bg-med-bg")}>
                        <Activity className="w-6 h-6" />
                    </NavLink>
                    <NavLink to="/risk" className={({ isActive }) => cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", isActive ? "bg-med-primary text-white shadow-lg shadow-med-primary/30" : "text-med-muted hover:bg-med-bg")}>
                        <Users className="w-6 h-6" />
                    </NavLink>
                </nav>

                <button className="w-12 h-12 rounded-full border border-med-muted/20 flex items-center justify-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-8 h-8 rounded-full" />
                </button>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-32 mr-4 my-4 flex flex-col h-[calc(100vh-2rem)]">

                {/* Header Removed */}

                {/* Content Overflow */}
                <div className="flex-1 overflow-auto pr-2 pb-2">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}
