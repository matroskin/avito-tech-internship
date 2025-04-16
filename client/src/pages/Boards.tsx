import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { boardStore } from '@/stores/boardStore';

const BoardsPage = observer(() => {
  useEffect(() => {
    boardStore.loadBoards();
  }, []);

  return (
    <>
      <div className="text-xl font-medium p-4">Все доски</div>
      <div className="flex flex-col gap-4 p-4">
        {boardStore.boards.map((board) => (
          <div key={board.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{board.name}</h2>
            <p>{board.description}</p>
          </div>
        ))}
      </div>
    </>
  );
});

export default BoardsPage;
