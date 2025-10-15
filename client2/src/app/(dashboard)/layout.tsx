'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, User, Settings, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/data', {
        credentials: 'include',
      });
      const data = await response.json();
      
      console.log('User data response:', data); // Debug log
      
      if (data.success) {
        setUserData({
          name: data.userData.name,
          email: data.userData.email,
        });
      } else {
        console.error('API returned error:', data.message);
        // If not authenticated, redirect to login
        if (data.message?.includes('authorized') || data.message?.includes('token')) {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Logged out successfully!');
        router.push('/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-[#fbcfe8] to-[#f9a8d4] shadow-lg flex flex-col items-center py-6 z-50">
        {/* Top Navigation Icons */}
        <nav className="flex flex-col gap-6 flex-1">
          {/* Home Icon */}
          <Link
            href="/dashboard"
            className={`p-4 rounded-xl transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
            title="Home"
          >
            <Home size={24} />
          </Link>

          {/* Calendar Icon */}
          <Link
            href="/calendar"
            className={`p-4 rounded-xl transition-all duration-200 ${
              isActive('/calendar')
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-white hover:bg-white/20'
            }`}
            title="Calendar"
          >
            <Calendar size={24} />
          </Link>
        </nav>

        {/* Profile Icon at Bottom with Popover */}
        <div className="mt-auto relative">
          <button
            onMouseEnter={() => setShowProfilePopover(true)}
            onMouseLeave={() => setShowProfilePopover(false)}
            className="p-4 rounded-xl transition-all duration-200 text-white hover:bg-white/20"
            title="Profile"
          >
            <User size={24} />
          </button>

          {/* Profile Popover */}
          {showProfilePopover && (
            <div
              onMouseEnter={() => setShowProfilePopover(true)}
              onMouseLeave={() => setShowProfilePopover(false)}
              className="absolute left-24 bottom-0 w-64 bg-white rounded-lg shadow-xl p-4 z-50 border border-pink-100"
            >
              {loading ? (
                <div className="text-gray-500 text-sm">Loading...</div>
              ) : userData ? (
                <>
                  {/* User Info */}
                  <div className="pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {userData.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <button className="w-full flex items-center gap-3 px-2 py-2.5 mt-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="text-gray-500 text-sm">Failed to load profile</div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-20 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

