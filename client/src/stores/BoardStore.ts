import { makeObservable, observable, action, runInAction } from 'mobx';
import { getBoards } from '@/api/boards/getBoards';
import type { Board } from '@/types/board';
import type { ApiError } from '@/types/error';

class BoardStore {
  boards: Board[] = [];
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      boards: observable,
      error: observable,
      fetchBoardsList: action,
    });
  }

  async fetchBoardsList() {
    try {
      const boards = await getBoards();
      runInAction(() => {
        this.boards = boards;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.boards = [];
        this.error = error as ApiError;
      });
      console.error('Ошибка при загрузке досок:', this.error);
    }
  }
}

export const boardStore = new BoardStore();
