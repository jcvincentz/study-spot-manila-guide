
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Home, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Search },
    { name: 'Map', path: '/map', icon: MapPin },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/40 backdrop-blur-md z-10">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
              isActive(item.path) 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
