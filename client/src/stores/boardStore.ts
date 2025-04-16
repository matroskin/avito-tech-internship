import { makeAutoObservable } from 'mobx';
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
}

export const boardStore = new BoardStore();
