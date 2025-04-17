import { makeObservable, observable, action, runInAction } from 'mobx';
import { getIssues } from '@/api/issues/getIssues';
import type { Task } from '@/types/task';
import type { ApiError } from '@/types/error';

class IssueStore {
  issues: Task[] = [];
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      issues: observable,
      error: observable,
      fetchIssuesList: action,
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
}

export const issueStore = new IssueStore();
