import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoListForm } from './todo-list-form';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';

// Mock the store
vi.mock('@ender-apprentice/shared/stores/todo', () => ({
  useTodoStore: vi.fn(),
}));

describe('TodoListForm', () => {
  // Mock store methods
  const createList = vi.fn();
  const updateList = vi.fn();
  const mockStore = {
    createList,
    updateList,
  };

  beforeEach(() => {
    // Reset mocks before each test
    createList.mockClear();
    updateList.mockClear();
    useTodoStore.mockImplementation(() => mockStore);
  });

  it('renders correctly for adding a new list', () => {
    render(<TodoListForm />);
    expect(screen.getByLabelText(/List Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/List Description/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add List' })).toBeInTheDocument();
  });

  it('renders correctly for editing an existing list', () => {
    const list = { id: 1, title: 'Test List', description: 'Test Description' };
    render(<TodoListForm list={list} />);
    expect(screen.getByLabelText(/List Name/)).toHaveValue('Test List');
    expect(screen.getByLabelText(/List Description/)).toHaveValue('Test Description');
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('updates state on input change', async () => {
    render(<TodoListForm />);
    const nameInput = screen.getByLabelText(/List Name/);
    const descriptionInput = screen.getByLabelText(/List Description/);

    fireEvent.change(nameInput, { target: { value: 'New List' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

    expect(nameInput).toHaveValue('New List');
    expect(descriptionInput).toHaveValue('New Description');
  });

  it('calls createList on form submission with new list', async () => {
    const closeModal = vi.fn();
    render(<TodoListForm closeModal={closeModal} />);

    fireEvent.change(screen.getByLabelText(/List Name/), { target: { value: 'New List' } });
    fireEvent.change(screen.getByLabelText(/List Description/), { target: { value: 'New Description' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Add List' }));

    expect(createList).toHaveBeenCalledWith({
      title: 'New List',
      description: 'New Description',
      items: [],
    });
    expect(closeModal).toHaveBeenCalled();
  });

  it('calls updateList on form submission with existing list', async () => {
    const closeModal = vi.fn();
    const list = { id: 1, title: 'Test List', description: 'Test Description' };
    render(<TodoListForm list={list} closeModal={closeModal} />);

    fireEvent.change(screen.getByLabelText(/List Name/), { target: { value: 'Updated List' } });
    fireEvent.change(screen.getByLabelText(/List Description/), { target: { value: 'Updated Description' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Save Changes' }));

    expect(updateList).toHaveBeenCalledWith({
      ...list,
      title: 'Updated List',
      description: 'Updated Description',
    });
    expect(closeModal).toHaveBeenCalled();
  });
});
