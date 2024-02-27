type ListNavigationProps = {
  todoLists: TodoListType[];
  activeList: number; // index
};

type TodoListItemType = {
  title: string;
  id: number;
  description: string;
  listId: number;
  isComplete: boolean;
};

type TodoListType = {
  title: string;
  id: number;
  description: string;
  items: TodoListItemType[];
};

export type { ListNavigationProps, TodoListItemType, TodoListType };
