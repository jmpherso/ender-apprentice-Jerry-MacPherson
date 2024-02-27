import { create } from 'zustand';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { todoListData } from '@ender-apprentice/shared/data/todo-list';

type StoreState = {
  todoListData: TodoListType[];
};

type StoreActions = {
  getTodoList: () => Promise<TodoListType[]>;
  getTodoListById: (id: number) => Promise<TodoListType | undefined>;
  createTodo: (list: Omit<TodoListItemType, 'id'>) => Promise<Omit<TodoListItemType, 'id'>>;
  updateTodo: (item: TodoListItemType) => Promise<void>;
  createList: (list: Omit<TodoListType, 'id'>) => Promise<Omit<TodoListType, 'id'>>;
};

const useTodoStore = create<StoreState & StoreActions>()((set, get) => ({
  todoListData: [...todoListData], // Initialize with the actual todoListData if available

  getTodoList: async () => {
    return get().todoListData;
  },

  getTodoListById: async (id) => {
    return get().todoListData.find((list) => list.id === id);
  },

  createTodo: async (list) => {
    set((state) => {
      const newList = { ...list, id: state.todoListData[list.listId].items.length };
      state.todoListData[list.listId].items.push(newList as TodoListItemType); // Assumed correct casting
      return { ...state };
    });
    return list;
  },

  updateTodo: async (item) => {
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === item.listId);
      if (listIndex !== -1) {
        const itemIndex = state.todoListData[listIndex].items.findIndex((i) => i.id === item.id);
        if (itemIndex !== -1) {
          state.todoListData[listIndex].items[itemIndex] = item;
        }
        return { ...state };
      }
      return { ...state };
    });
  },

  createList: async (list) => {
    set((state) => {
      const newList = { ...list, id: state.todoListData.length } as TodoListType; // Assumed correct casting
      state.todoListData.push(newList);
      return { ...state };
    });
    return list;
  },
}));

export { useTodoStore };
