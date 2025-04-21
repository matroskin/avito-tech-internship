import { makeObservable, observable, action, runInAction } from 'mobx';
import { getUsers } from '@/api/users/getUsers';
import type { ApiError } from '@/types/error';
import type { User } from '@/types/user';

class UserStore {
  users: User[] = [];
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      users: observable,
      error: observable,
      fetchUsers: action,
    });
  }

  async fetchUsers() {
    try {
      const users = await getUsers();
      runInAction(() => {
        this.users = users;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.users = [];
        this.error = error as ApiError;
      });
      console.error('Ошибка при загрузке пользователей:', this.error);
    }
  }
}

export const userStore = new UserStore();
