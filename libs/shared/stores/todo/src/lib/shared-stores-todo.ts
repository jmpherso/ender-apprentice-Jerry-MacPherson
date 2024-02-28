import { create } from 'zustand';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { todoListData } from '@ender-apprentice/shared/data/todo-list';

interface StoreState {
  todoListData: TodoListType[];
}

interface StoreActions {
  getTodoList: () => TodoListType[];
  getTodoListById: (id: number) => TodoListType | undefined;
  createTodo: (todo: Omit<TodoListItemType, 'id'> & { listId: number }) => TodoListItemType;
  updateTodo: (item: TodoListItemType) => void;
  createList: (list: Omit<TodoListType, 'id'>) => TodoListType;
  updateList: (list: TodoListType) => void;
}

const useTodoStore = create<StoreState & StoreActions>((set, get) => ({
  todoListData: [...todoListData],

  getTodoList: () => get().todoListData,

  getTodoListById: (id) => get().todoListData.find((list) => list.id === id),

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

  updateTodo: (item) => {
    set((state) => {
      const listIndex = state.todoListData.findIndex((list) => list.id === item.listId);
      if (listIndex !== -1) {
        const itemIndex = state.todoListData[listIndex]?.items.findIndex((i) => i.id === item.id);
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
}));

export { useTodoStore };
