import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';

interface TodoListType {
  readonly description: string;
  readonly id: number;
  readonly items: readonly TodoListItemType[];
  readonly title: string;
}

export type { TodoListType };
