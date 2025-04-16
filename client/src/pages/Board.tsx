import { useParams } from 'react-router-dom';

export default function BoardPage() {
  const { id } = useParams();

  return <div>Доска с ID: { id }</div>;
}
