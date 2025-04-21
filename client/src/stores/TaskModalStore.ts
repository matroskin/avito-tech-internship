import { makeObservable, observable, action } from 'mobx';
import { createTask } from '@/api/tasks/createTask';
import { updateTask } from '@/api/tasks/updateTask';
import { issueStore } from '@/stores/IssueStore';
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
  assigneeId: number | null = null;
  boardId: number | null = null;
  selectedTaskId: number | null = null;

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
      selectedTaskId: observable,
      openCreate: action,
      openEdit: action,
      close: action,
      setField: action,
      setFields: action,
      resetFields: action,
      setCurrentBoardId: action,
      setSelectedTaskId: action,
    });
  }

  openCreate(boardId?: number) {
    this.resetFields();
    this.mode = 'create';
    this.task = null;
    this.isOpen = true;
    this.boardId = boardId ?? null;
  }

  openEdit(task: Task) {
    this.mode = 'edit';
    this.task = task;
    this.isOpen = true;

    this.setFields({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assigneeId: task.assignee?.id ?? null,
      boardId: task.boardId ?? this.boardId ?? null,
    });
  }

  close() {
    this.isOpen = false;
    this.task = null;
    this.selectedTaskId = null;
    // this.boardId = null;
    this.resetFields();
  }

  setField<K extends keyof TaskModalStore>(key: K, value: TaskModalStore[K]) {
    (this as any)[key] = value;
  }

  setFields(
    fields: Partial<Pick<TaskModalStore, 'title' | 'description' | 'priority' | 'status' | 'assigneeId' | 'boardId'>>,
  ) {
    Object.entries(fields).forEach(([key, value]) => {
      (this as any)[key] = value;
    });
  }

  resetFields() {
    this.title = '';
    this.description = '';
    this.priority = 'Low';
    this.status = 'Backlog';
    this.assigneeId = null;
    // this.boardId = null;
  }

  async submit() {
    const dto = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      assigneeId: this.assigneeId!,
      boardId: this.boardId!,
    };

    if (this.mode === 'create') {
      await createTask(dto);
    }

    if (this.mode === 'edit' && this.task) {
      await updateTask(this.task.id, dto);
    }

    if (this.boardId !== null) {
      issueStore.fetchBoardIssues(this.boardId);
    }

    issueStore.fetchIssuesList();

    this.close();
  }

  setCurrentBoardId(id: number | null) {
    this.boardId = id;
  }

  setSelectedTaskId(id: number | null) {
    this.selectedTaskId = id;
  }
}

export const taskModalStore = new TaskModalStore();
