import { todoListData } from '@ender-apprentice/shared/data/todo-list';
import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { create } from 'zustand';

interface StoreState {
  todoListData: readonly TodoListType[];
}

interface StoreActions {
  createList: (list: Readonly<Omit<TodoListType, 'id'>>) => TodoListType; // Made parameter read-only
  createTodo: (todo: Readonly<Omit<TodoListItemType, 'id'> & { listId: number }>) => TodoListItemType; // Made parameter read-only
  getTodoList: () => readonly TodoListType[];
  getTodoListById: (id: number) => TodoListType | undefined;
  updateList: (list: Readonly<TodoListType>) => void; // Made parameter read-only
  updateTodo: (item: Readonly<TodoListItemType>) => void; // Made parameter read-only
}

const notFoundIndex = -1; // Named constant for magic number -1

/* eslint-disable total-functions/no-unsafe-readonly-mutable-assignment */ // Allow mutable assignment for zustand
const useTodoStore = create<StoreActions & StoreState>((set, get) => ({
  createList: (list: Readonly<Omit<TodoListType, 'id'>>) => {
    // Made parameter read-only

    let newId = 0;

    set((state) => {
      newId = state.todoListData.reduce((maxId, currentList) => Math.max(currentList.id, maxId), notFoundIndex) + 1;

      const newList = { ...list, id: newId };

      return {
        ...state,
        todoListData: [...state.todoListData, newList],
      };
    });

    return { ...list, id: newId };
  },
  /* eslint-enable total-functions/no-unsafe-readonly-mutable-assignment */

  createTodo: (todo: Readonly<Omit<TodoListItemType, 'id'>> & { listId: number }) => {
    let newItemId = 0;

    set((state) => {
      newItemId = Date.now();

      const newItem: TodoListItemType = { ...todo, id: newItemId };

      const listIndex = state.todoListData.findIndex((list) => list.id === todo.listId);

      if (listIndex !== notFoundIndex) {
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

      if (listIndex !== notFoundIndex) {
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

      if (listIndex !== notFoundIndex) {
        const itemIndex = state.todoListData[listIndex]?.items.findIndex((index) => index.id === item.id);

        if (itemIndex !== notFoundIndex) {
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
