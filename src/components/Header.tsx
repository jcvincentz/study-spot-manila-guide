
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-3 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="font-semibold text-lg">{title}</h1>
        </div>
        
        {isHomePage && (
          <div className="flex items-center space-x-2">
            {/* Add profile button or other header actions here */}
          </div>
        )}
      </div>
    </header>
  );
};
