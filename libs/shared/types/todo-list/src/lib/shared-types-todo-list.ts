import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';

interface TodoListType {
  description: string;
  id: number;
  items: TodoListItemType[];
  title: string;
}

export type { TodoListType };
