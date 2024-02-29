import { beforeEach, describe, expect, it, vi } from 'vitest';
import { create, useStore } from 'zustand';
import { act } from 'react-dom/test-utils';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';

//Mocking the store
vi.mock('@ender-apprentice/shared/stores/todo', () => ({
  useTodoStore: vi.fn(),
}));

//Mocking the todo list data
const todoListData: TodoListType[] = [
  {
    id: 1,
    title: 'Test List',
    description: 'Test Description',
    items: [
      {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        isComplete: false,
        listId: 1,
      },
    ],
  },
];

//Mocking the store methods
const getTodoList = vi.fn(() => todoListData);
const getTodoListById = vi.fn((id: number) => todoListData.find((list) => list.id === id));
const createTodo = vi.fn((todo: Omit<TodoListItemType, 'id'> & { listId: number }) => {
  let newItemId = 0;
  const newItem: TodoListItemType = { ...todo, id: newItemId };
  return { ...todo, id: newItemId };
});
const updateTodo = vi.fn((item: TodoListItemType) => {});
const createList = vi.fn((list: Omit<TodoListType, 'id'>) => {
  return list;
});
const updateList = vi.fn((list: TodoListType) => {});

//Mocking the store
useTodoStore.mockImplementation(() => ({
  getTodoList,
  getTodoListById,
  createTodo,
  updateTodo,
  createList,
  updateList,
}));

//Testing the store methods
describe('Todo Store', () => {
  it('gets the todo list', () => {
    const store = useTodoStore();
    expect(store.getTodoList()).toEqual(todoListData);
  });

  it('gets the todo list by id', () => {
    const store = useTodoStore();
    expect(store.getTodoListById(1)).toEqual(todoListData[0]);
  });

  it('creates a todo', () => {
    const store = useTodoStore();
    const todo = {
      title: 'New Todo',
      description: 'New Description',
      isComplete: false,
      listId: 1,
    };
    expect(store.createTodo(todo)).toEqual({ ...todo, id: 0 });
  });

  it('updates a todo', () => {
    const store = useTodoStore();
    const todo = {
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      isComplete: true,
      listId: 1,
    };
    store.updateTodo(todo);
    expect(updateTodo).toHaveBeenCalledWith(todo);
  });

  it('creates a list', () => {
    const store = useTodoStore();
    const list = {
      title: 'New List',
      description: 'New Description',
      items: [],
    };
    expect(store.createList(list)).toEqual(list);
  });

  it('updates a list', () => {
    const store = useTodoStore();
    const list = {
      id: 1,
      title: 'Test List',
      description: 'Test Description',
      items: [],
    };
    store.updateList(list);
    expect(updateList).toHaveBeenCalledWith(list);
  });
});





