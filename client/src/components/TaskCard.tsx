import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/task';

export function TaskCard({ issue }: { issue: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Backlog':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card key={issue.id} className="overflow-hidden gap-2">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <CardTitle className={cn('text-base font-medium', issue.status === 'Done' && 'text-muted-foreground')}>
              {issue.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={getStatusColor(issue.status)}>
            {issue.status}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(issue.priority)}>
            {issue.priority}
          </Badge>
          <Badge variant="outline">{issue.boardName}</Badge>
        </div>

        <div className="flex items-center mt-4">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={issue.assignee.avatarUrl || '/placeholder.svg'} alt={issue.assignee.fullName} />
            <AvatarFallback>{getInitials(issue.assignee.fullName)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{issue.assignee.fullName}</span>
        </div>
      </CardContent>
    </Card>
  );
}
