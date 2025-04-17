import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';
import type { Board } from '@/types/board';

export function ProjectCard({ board }: { board: Board }) {
  return (
    <Link to={`/board/${board.id}`} key={board.id}>
      <Card className="h-full justify-between">
        <CardHeader>
          <CardTitle className="text-xl">{board.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{board.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ListChecks className="h-4 w-4" />
            <span>{board.taskCount} задач</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
