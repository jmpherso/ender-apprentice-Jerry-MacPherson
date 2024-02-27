import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';

type TodoListType = {
  title: string;
  id: number;
  description: string;
  items: TodoListItemType[];
};

export type { TodoListType };
