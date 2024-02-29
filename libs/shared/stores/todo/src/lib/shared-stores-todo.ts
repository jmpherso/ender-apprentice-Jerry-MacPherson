import { todoListData } from '@ender-apprentice/shared/data/todo-list';
import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { create } from 'zustand';

interface StoreState {
  todoListData: TodoListType[];
}

interface StoreActions {
  createList: (list: Omit<TodoListType, 'id'>) => TodoListType;
  createTodo: (todo: Omit<TodoListItemType, 'id'> & { listId: number }) => TodoListItemType;
  getTodoList: () => TodoListType[];
  getTodoListById: (id: number) => TodoListType | undefined;
  updateList: (list: TodoListType) => void;
  updateTodo: (item: TodoListItemType) => void;
}

const useTodoStore = create<StoreActions & StoreState>((set, get) => ({
  createList: (list: Omit<TodoListType, 'id'>) => {
    let newId = 0;

    set((state) => {
      newId = state.todoListData.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1;

      const newList = { ...list, id: newId };

      return {
        ...state,
        todoListData: [...state.todoListData, newList],
      };
    });

    return { ...list, id: newId };
  },

  createTodo: (todo: Omit<TodoListItemType, 'id'> & { listId: number }) => {
    let newItemId = 0;

    set((state) => {
      newItemId = Date.now();

      const newItem: TodoListItemType = { ...todo, id: newItemId };

      const listIndex = state.todoListData.findIndex((list) => list.id === todo.listId);

      if (listIndex !== -1) {
        const newList = { ...state.todoListData[listIndex] };

        newList.items = newList.items ? [...newList.items, newItem] : [newItem];

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

    return { ...todo, id: newItemId };
  },

  getTodoList: () => get().todoListData,

  getTodoListById: (id) => get().todoListData.find((list) => list.id === id),

  todoListData: Array.from(todoListData),

  updateList: (updatedList) => {
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

  updateTodo: (item) => {
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === item.listId);

      if (listIndex !== -1) {
        const itemIndex = state.todoListData[listIndex]?.items.findIndex((index) => index.id === item.id);

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
}));

export { useTodoStore };
