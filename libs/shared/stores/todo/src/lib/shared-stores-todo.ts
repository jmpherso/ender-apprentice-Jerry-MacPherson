import { create } from 'zustand';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { todoListData } from '@ender-apprentice/shared/data/todo-list';

interface StoreState {
  todoListData: TodoListType[];
}

interface StoreActions {
  getTodoList: () => Promise<TodoListType[]>;
  getTodoListById: (id: number) => Promise<TodoListType | undefined>;
  createTodo: (todo: Omit<TodoListItemType, 'id'> & { listId: number }) => Promise<TodoListItemType>;
  updateTodo: (item: TodoListItemType) => Promise<void>;
  createList: (list: Omit<TodoListType, 'id'>) => Promise<TodoListType>;
  updateList: (list: TodoListType) => Promise<void>; // Added updateList function
}

const useTodoStore = create<StoreState & StoreActions>((set, get) => ({
  todoListData: [...todoListData],

  getTodoList: async () => get().todoListData,

  getTodoListById: async (id) => get().todoListData.find((list) => list.id === id),

  createTodo: async (todo) => {
    const newItemId = Date.now(); // Simple, more robust ID generation strategy
    const newItem: TodoListItemType = { ...todo, id: newItemId };
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === todo.listId);
      if (listIndex !== -1) {
        const newList = { ...state.todoListData[listIndex] };
        newList.items = [...newList.items, newItem];
        return {
          ...state,
          todoListData: [
            ...state.todoListData.slice(0, listIndex),
            newList,
            ...state.todoListData.slice(listIndex + 1),
          ],
        };
      }
      return state;
    });
    return newItem;
  },

  updateTodo: async (item) => {
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === item.listId);
      if (listIndex !== -1) {
        const itemIndex = state.todoListData[listIndex].items.findIndex((i) => i.id === item.id);
        if (itemIndex !== -1) {
          const newList = { ...state.todoListData[listIndex] };
          newList.items = [...newList.items.slice(0, itemIndex), item, ...newList.items.slice(itemIndex + 1)];
          return {
            ...state,
            todoListData: [
              ...state.todoListData.slice(0, listIndex),
              newList,
              ...state.todoListData.slice(listIndex + 1),
            ],
          };
        }
      }
      return state;
    });
  },

  createList: async (list) => {
    const newListId = Date.now(); // Simple, more robust ID generation strategy
    const newList: TodoListType = { ...list, id: newListId, items: [] };
    set((state) => ({
      ...state,
      todoListData: [...state.todoListData, newList],
    }));
    return newList;
  },

  updateList: async (updatedList) => {
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === updatedList.id);
      if (listIndex !== -1) {
        return {
          ...state,
          todoListData: [
            ...state.todoListData.slice(0, listIndex),
            updatedList,
            ...state.todoListData.slice(listIndex + 1),
          ],
        };
      }
      return state;
    });
  },
}));

export { useTodoStore };
