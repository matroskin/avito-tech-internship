import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link
                to="/issues"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === '/issues' ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                Все задачи
              </Link>
              <Link
                to="/boards"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname.startsWith('/board') || pathname === '/' ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                Проекты
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Создать задачу</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
