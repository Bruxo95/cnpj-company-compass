
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, BarChart, LogOut, Menu, X, Building } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      isActive ? 'bg-secondary text-white' : 'hover:bg-gray-100'
    }`;
  };

  // Get user display name from metadata or fallback to email
  const userDisplayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  // Mobile sidebar implementation using Sheet component
  const MobileSidebar = () => (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[300px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-secondary-teal" />
              <h1 className="text-xl font-bold text-primary-blue">CompanyData</h1>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <NavLink to="/app" end className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <BarChart className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/app/search" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
              <Search className="h-5 w-5" />
              <span>Pesquisar Empresas</span>
            </NavLink>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">{userDisplayName}</p>
                <p className="text-sm text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-secondary-teal" />
            <h1 className="text-xl font-bold text-primary-blue">CompanyData</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/app" end className={navLinkClass}>
            <BarChart className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/app/search" className={navLinkClass}>
            <Search className="h-5 w-5" />
            <span>Pesquisar Empresas</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">{userDisplayName}</p>
              <p className="text-sm text-gray-500 truncate">{userEmail}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-light-bg">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <MobileSidebar />
            <h1 className="text-lg font-semibold text-primary-blue">CompanyData</h1>
            <div className="w-8"></div> {/* Empty div for balance */}
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
