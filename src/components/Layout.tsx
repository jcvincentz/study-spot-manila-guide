
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  includeContainer?: boolean;
}

export const Layout = ({ children, includeContainer = true }: LayoutProps) => {
  return (
    <div className={includeContainer ? "app-container" : ""}>
      {children}
    </div>
  );
};
