import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { getIssues } from '@/api/issues/getIssues';
import type { Task } from '@/types/task';
import type { ApiError } from '@/types/error';

class IssueStore {
  issues: Task[] = [];
  error: ApiError | null = null;
  search: string = '';
  statusFilter: string | null = null;
  boardFilter: number | null = null;

  constructor() {
    makeObservable(this, {
      issues: observable,
      error: observable,
      search: observable,
      statusFilter: observable,
      boardFilter: observable,
      fetchIssuesList: action,
      setSearch: action,
      setStatusFilter: action,
      setBoardFilter: action,
      filteredIssues: computed,
    });
  }

  async fetchIssuesList() {
    try {
      const tasks = await getIssues();
      runInAction(() => {
        this.issues = tasks;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.issues = [];
        this.error = error as ApiError;
      });
      console.error('Ошибка при загрузке задач:', this.error);
    }
  }

  setStatusFilter(status: string | null) {
    this.statusFilter = status;
  }

  setBoardFilter(boardId: number | null) {
    this.boardFilter = boardId;
  }

  setSearch(query: string) {
    this.search = query;
  }

  get filteredIssues(): Task[] {
    const q = this.search.toLowerCase();
    return this.issues.filter((task) => {
      const inTitle = task.title.toLowerCase().includes(q);
      const inAssignee = task.assignee?.fullName.toLowerCase().includes(q);
      const statusMatch = this.statusFilter ? task.status === this.statusFilter : true;
      const boardMatch = this.boardFilter ? task.boardId === this.boardFilter : true;
      return (inTitle || inAssignee) && statusMatch && boardMatch;
    });
  }
}

export const issueStore = new IssueStore();
