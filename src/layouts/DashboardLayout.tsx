
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, BarChart, LogOut, Menu, X, Building } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      isActive ? 'bg-secondary text-white' : 'hover:bg-gray-100'
    }`;
  };

  // Get user display name from metadata or fallback to email
  const userDisplayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-lg fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-64'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-secondary-teal" />
              <h1 className="text-xl font-bold text-primary-blue">CompanyData</h1>
            </div>
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
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
                <p className="text-sm text-gray-500">{userEmail}</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
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
