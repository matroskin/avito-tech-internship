import { useParams } from 'react-router-dom';

export default function BoardPage() {
  const { id } = useParams();

  return <div className="text-xl font-medium p-4">Доска с ID: { id }</div>;
}
