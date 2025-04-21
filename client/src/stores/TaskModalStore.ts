import { makeObservable, observable, action } from 'mobx';
import type { Task, TaskPriorityEnum, TaskStatusEnum } from '@/types/task';

type Mode = 'create' | 'edit';

class TaskModalStore {
  isOpen = false;
  mode: Mode = 'create';
  task: Task | null = null;

  title = '';
  description = '';
  priority: TaskPriorityEnum = 'Low';
  status: TaskStatusEnum = 'Backlog';
  assigneeId = 0;
  boardId: number | null = null;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      mode: observable,
      task: observable,
      title: observable,
      description: observable,
      priority: observable,
      status: observable,
      assigneeId: observable,
      boardId: observable,
      openCreate: action,
      openEdit: action,
      close: action,
      setField: action,
      resetFields: action,
    });
  }

  openCreate(boardId?: number) {
    this.mode = 'create';
    this.task = null;
    this.isOpen = true;
    this.resetFields();
    this.boardId = boardId ?? null;
  }

  openEdit(task: Task) {
    this.mode = 'edit';
    this.task = task;
    this.title = task.title;
    this.description = task.description;
    this.priority = task.priority;
    this.status = task.status;
    this.assigneeId = task.assignee.id;
    this.boardId = task.boardId ?? null;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.task = null;
    this.resetFields();
  }

  setField(key: 'title' | 'description' | 'priority' | 'status' | 'assigneeId' | 'boardId', value: any) {
    (this as any)[key] = value;
  }

  resetFields() {
    this.title = '';
    this.description = '';
    this.priority = 'Low';
    this.status = 'Backlog';
    this.assigneeId = 0;
    this.boardId = null;
  }
}

export const taskModalStore = new TaskModalStore();
