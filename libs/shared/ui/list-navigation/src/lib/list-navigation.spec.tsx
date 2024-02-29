import '@testing-library/jest-dom';

import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ListNavigation } from './list-navigation';

// Mock external components and icons
vi.mock('@mui/icons-material/Add', () => ({
  __esModule: true,
  default: () => <div>AddIcon</div>, // Simple mock for the Add icon
}));

vi.mock('../../../../../../components/ui/button', () => ({
  Button: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('../../../../../../components/ui/tooltip', () => ({
  Tooltip: ({ children }) => <div>{children}</div>,
  TooltipContent: ({ children }) => <div>{children}</div>,
  TooltipProvider: ({ children }) => <div>{children}</div>,
  TooltipTrigger: ({ children }) => <div>{children}</div>,
}));

vi.mock('@ender-apprentice/shared/ui/modal', () => ({
  Modal: ({ children, onClose, opened }) => (opened ? <div>{children}</div> : null),
}));

vi.mock('@ender-apprentice/shared/ui/todo-list-form', () => ({
  TodoListForm: () => <div>TodoListForm</div>,
}));

vi.mock('@ender-apprentice/shared/ui/list-navigation-item', () => ({
  ListNavigationItem: ({ list }) => <div>{list.title}</div>,
}));

describe('ListNavigation component', () => {
  const mockLists: TodoListType[] = [
    { description: 'Description 1', id: 1, items: [], title: 'List 1' },
    { description: 'Description 2', id: 2, items: [], title: 'List 2' },
  ];
  const mockChangeSelectedListId = vi.fn();

  beforeEach(() => {
    mockChangeSelectedListId.mockClear();
  });

  it('renders list items correctly', () => {
    render(<ListNavigation changeSelectedListId={mockChangeSelectedListId} lists={mockLists} selectedListId={1} />);
    expect(screen.getByText('List 1')).toBeInTheDocument();
    expect(screen.getByText('List 2')).toBeInTheDocument();
  });

  it('renders the add button', () => {
    render(<ListNavigation changeSelectedListId={() => {}} lists={[]} selectedListId={0} />);
    screen.debug(); // This will print the rendered output
  });

  it('opens the modal on add icon click', () => {
    render(<ListNavigation changeSelectedListId={mockChangeSelectedListId} lists={mockLists} selectedListId={1} />);

    const addButton = screen.getByRole('button'); // Adjust the name based on your actual aria-label or text content within the button

    fireEvent.click(screen.getByText('AddIcon'));
    expect(screen.getByText('TodoListForm')).toBeInTheDocument();

    // Assuming your Modal calls `onClose` to close the modal
    // and your TodoListForm somehow triggers that onClose, you might need to simulate that action here
    // For example, if there's a close button in your form, you would do:
    // fireEvent.click(screen.getByText('CloseButton'));
  });

  it('changes selected list on item click', () => {
    render(<ListNavigation changeSelectedListId={mockChangeSelectedListId} lists={mockLists} selectedListId={1} />);
    fireEvent.click(screen.getByText('List 2'));
    expect(mockChangeSelectedListId).toHaveBeenCalledWith(2);
  });
});
