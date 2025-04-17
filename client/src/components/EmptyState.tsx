export const EmptyState = ({ message = 'Задачи не найдены' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
    <p className="text-sm">{message}</p>
  </div>
);
