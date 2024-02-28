import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoListItemForm } from './todo-list-item-form';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';

// Mock the store
vi.mock('@ender-apprentice/shared/stores/todo', () => ({
  useTodoStore: vi.fn(),
}));

describe('TodoListItemForm', () => {
  // Mock store methods
  const createTodo = vi.fn();
  const updateTodo = vi.fn();
  const mockStore = {
    createTodo,
    updateTodo,
  };

  beforeEach(() => {
    // Reset mocks before each test
    createTodo.mockClear();
    updateTodo.mockClear();
    useTodoStore.mockImplementation(() => mockStore);
  });

  it('renders correctly for adding a new item', () => {
    render(<TodoListItemForm listId={1} />);
    expect(screen.getByLabelText(/Item Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Item Description/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
  });

  it('renders correctly for editing an existing item', () => {
    const item = { id: 1, title: 'Test Item', description: 'Test Description', listId: 1 };
    render(<TodoListItemForm item={item} listId={1} />);
    expect(screen.getByLabelText(/Item Name/)).toHaveValue('Test Item');
    expect(screen.getByLabelText(/Item Description/)).toHaveValue('Test Description');
    expect(screen.getByRole('button', { name: 'Edit Item' })).toBeInTheDocument();
  });

  it('updates state on input change', async () => {
    render(<TodoListItemForm listId={1} />);
    const nameInput = screen.getByLabelText(/Item Name/);
    const descriptionInput = screen.getByLabelText(/Item Description/);

    fireEvent.change(nameInput, { target: { value: 'New Item' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

    expect(nameInput).toHaveValue('New Item');
    expect(descriptionInput).toHaveValue('New Description');
  });

  it('calls createTodo on form submission with new item', async () => {
    const closeModal = vi.fn();
    render(<TodoListItemForm listId={1} closeModal={closeModal} />);

    fireEvent.change(screen.getByLabelText(/Item Name/), { target: { value: 'New Item' } });
    fireEvent.change(screen.getByLabelText(/Item Description/), { target: { value: 'New Description' } });
    fireEvent.submit(screen.getByTestId('todo-item-form'));

    expect(createTodo).toHaveBeenCalledWith({
      title: 'New Item',
      description: 'New Description',
      listId: 1,
      isComplete: false,
    });
    expect(closeModal).toHaveBeenCalled();
  });

  it('calls updateTodo on form submission with existing item', async () => {
    const closeModal = vi.fn();
    const item = { id: 1, title: 'Test Item', description: 'Test Description', listId: 1 };
    render(<TodoListItemForm item={item} listId={1} closeModal={closeModal} />);

    fireEvent.change(screen.getByLabelText(/Item Name/), { target: { value: 'Updated Item' } });
    fireEvent.change(screen.getByLabelText(/Item Description/), { target: { value: 'Updated Description' } });
    fireEvent.submit(screen.getByTestId('todo-item-form'));

    expect(updateTodo).toHaveBeenCalledWith({
      ...item,
      title: 'Updated Item',
      description: 'Updated Description',
    });
    expect(closeModal).toHaveBeenCalled();
  });
});
