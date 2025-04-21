import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from '@/components/Header';
import { TaskDialog } from '@/components/TaskDialog';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = observer(({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>

      <TaskDialog />
    </div>
  );
});
