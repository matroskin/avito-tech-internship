import { makeAutoObservable } from 'mobx';
import { getBoards } from '@/api/boards/getBoards';
import type { Board } from '@/types/board';

class BoardStore {
  boards: Board[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBoards(boards: Board[]) {
    this.boards = boards;
  }

  addBoard(board: Board) {
    this.boards.push(board);
  }

  async loadBoards() {
    try {
      const boards = await getBoards();
      this.boards = boards;
    } catch (error) {
      console.error(error);
    }
  }
}

export const boardStore = new BoardStore();
