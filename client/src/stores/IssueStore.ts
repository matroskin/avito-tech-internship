import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { getTasks } from '@/api/tasks/getTasks';
import { getBoardTasks } from '@/api/boards/getBoardTasks';
import { updateTaskStatus } from '@/api/tasks/updateTaskStatus';
import type { Task, TaskStatusEnum } from '@/types/task';
import type { ApiError } from '@/types/error';

class IssueStore {
  issues: Task[] = [];
  boardIssues: Task[] = [];
  error: ApiError | null = null;
  search: string = '';
  statusFilter: string | null = null;
  boardFilter: number | null = null;

  constructor() {
    makeObservable(this, {
      issues: observable,
      boardIssues: observable,
      error: observable,
      search: observable,
      statusFilter: observable,
      boardFilter: observable,
      fetchIssuesList: action,
      fetchBoardIssues: action,
      updateIssueStatus: action,
      changeIssueStatus: action,
      setSearch: action,
      setStatusFilter: action,
      setBoardFilter: action,
      filteredBoardIssues: action,
      filteredIssues: computed,
    });
  }

  async fetchIssuesList() {
    try {
      const tasks = await getTasks();
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

  filteredBoardIssues(status: string): Task[] {
    return this.boardIssues.filter((task) => task.status === status);
  }

  async fetchBoardIssues(boardId: number) {
    this.boardIssues = [];
    try {
      const tasks = await getBoardTasks(boardId);
      runInAction(() => {
        this.boardIssues = tasks;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.boardIssues = [];
        this.error = error as ApiError;
      });
      console.error('Ошибка при загрузке задач доски:', this.error);
    }
  }

  async changeIssueStatus(taskId: number, newStatus: TaskStatusEnum) {
    try {
      await updateTaskStatus(taskId, { status: newStatus });
      runInAction(() => {
        this.updateIssueStatus(taskId, newStatus);
      });
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
    }
  }

  updateIssueStatus(taskId: number, newStatus: TaskStatusEnum) {
    const update = (arr: Task[]) => {
      const task = arr.find((t) => t.id === taskId);
      if (task) task.status = newStatus;
    };
    update(this.issues);
    update(this.boardIssues);
  }
}

export const issueStore = new IssueStore();
