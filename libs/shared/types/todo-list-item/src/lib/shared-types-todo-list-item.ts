interface TodoListItemType {
  readonly description: string;
  readonly id: number;
  readonly isComplete: boolean;
  readonly listId: number;
  readonly title: string;
}

export type { TodoListItemType };
