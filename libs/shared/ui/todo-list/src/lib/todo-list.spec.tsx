import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TodoList } from './todo-list';

// Mocks for external components and modules
vi.mock('@ender-apprentice/shared/ui/modal', () => ({
  Modal: vi.fn(({ children, onClose, opened }) => (opened ? <div>{children}</div> : null)),
}));
vi.mock('@ender-apprentice/shared/ui/todo-list-form', () => ({
  TodoListForm: () => <div>TodoListForm</div>,
}));
vi.mock('@ender-apprentice/shared/ui/todo-list-item', () => ({
  TodoListItem: ({ item }) => <div>{item.content}</div>,
}));
vi.mock('@ender-apprentice/shared/ui/todo-list-item-form', () => ({
  TodoListItemForm: () => <div>TodoListItemForm</div>,
}));
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
}));
vi.mock('@mui/icons-material/Add', () => ({
  __esModule: true,
  default: () => <div>AddIcon</div>,
}));

describe('TodoList component', () => {
  const mockList = {
    description: 'Test Description',
    id: 1,

    items: [
      { content: 'Item 1', id: 1, isComplete: false },
      { content: 'Item 2', id: 2, isComplete: true },
    ],

    title: 'Test List',
  };

  it('renders list title and description', () => {
    render(<TodoList list={mockList} />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('toggles showing/hiding completed items', () => {
    render(<TodoList list={mockList} />);

    // Assuming the initial state is showing completed items
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    const toggleButton = screen.getByText('Hide Complete');

    fireEvent.click(toggleButton);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('opens list edit modal on button click', () => {
    render(<TodoList list={mockList} />);

    const editButton = screen.getByText('Edit details');

    fireEvent.click(editButton);
    expect(screen.getByText('TodoListForm')).toBeInTheDocument();
  });

  it('opens item add modal on button click', () => {
    render(<TodoList list={mockList} />);

    const addButton = screen.getByText('AddIcon'); // Or use getByRole if AddIcon renders an icon with a specific role

    fireEvent.click(addButton);
    expect(screen.getByText('TodoListItemForm')).toBeInTheDocument();
  });
});
