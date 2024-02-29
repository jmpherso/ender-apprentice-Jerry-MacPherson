import '@testing-library/jest-dom';

import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TodoListItem } from './todo-list-item';

// matchMedia fix
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      addListener() {},
      matches: false,
      removeListener() {},
    };
  };

// Mocking the todo store
vi.mock('@ender-apprentice/shared/stores/todo', () => ({
  useTodoStore: vi.fn(),
}));

const mockUpdateTodo = vi.fn();

const initialItem = {
  description: 'Test Description',
  id: 'todo-1',
  isComplete: false,
  listId: 'list-1',
  title: 'Test Todo',
};

useTodoStore.mockImplementation(() => ({
  updateTodo: mockUpdateTodo,
}));

describe('TodoListItem', () => {
  it('renders correctly', () => {
    render(<TodoListItem item={initialItem} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});

it('toggles todo completion status', () => {
  render(<TodoListItem item={initialItem} />);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(mockUpdateTodo).toHaveBeenCalledWith({
    ...initialItem,
    isComplete: true,
  });
});

it('toggles showing and hiding details', () => {
  render(<TodoListItem item={initialItem} />);
  expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('KeyboardArrowDownIcon'));
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('arrow button'));
  expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
});

it('opens and closes the edit modal', () => {
  render(<TodoListItem item={initialItem} />);
  fireEvent.click(screen.getByTestId('EditIcon'));
  expect(screen.getByText('Edit item')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Exit'));
  expect(screen.queryByText('Edit item')).not.toBeInTheDocument();
});
