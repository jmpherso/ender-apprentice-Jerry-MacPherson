import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListNavigation } from './list-navigation';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';

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
  TooltipTrigger: ({ children }) => <div>{children}</div>,
  TooltipContent: ({ children }) => <div>{children}</div>,
  TooltipProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock('@ender-apprentice/shared/ui/modal', () => ({
  Modal: ({ opened, onClose, children }) => opened ? <div>{children}</div> : null,
}));

vi.mock('@ender-apprentice/shared/ui/todo-list-form', () => ({
  TodoListForm: () => <div>TodoListForm</div>,
}));

vi.mock('@ender-apprentice/shared/ui/list-navigation-item', () => ({
  ListNavigationItem: ({ list }) => <div>{list.title}</div>,
}));

describe('ListNavigation component', () => {
  const mockLists: TodoListType[] = [
    { id: 1, title: 'List 1', description: 'Description 1', items: []},
    { id: 2, title: 'List 2' , description: 'Description 2', items: []},
  ];
  const mockChangeSelectedListId = vi.fn();

  beforeEach(() => {
    mockChangeSelectedListId.mockClear();
  });

  it('renders list items correctly', () => {
    render(<ListNavigation lists={mockLists} selectedListId={1} changeSelectedListId={mockChangeSelectedListId} />);
    expect(screen.getByText('List 1')).toBeInTheDocument();
    expect(screen.getByText('List 2')).toBeInTheDocument();
  });

  it('renders the add button', () => {
    render(<ListNavigation lists={[]} selectedListId={0} changeSelectedListId={() => {}} />);
    screen.debug(); // This will print the rendered output
  });

  it('opens the modal on add icon click', () => {
    render(<ListNavigation lists={mockLists} selectedListId={1} changeSelectedListId={mockChangeSelectedListId} />);
    const addButton = screen.getByRole('button'); // Adjust the name based on your actual aria-label or text content within the button
    fireEvent.click(screen.getByText('AddIcon'));
    expect(screen.getByText('TodoListForm')).toBeInTheDocument();

    // Assuming your Modal calls `onClose` to close the modal
    // and your TodoListForm somehow triggers that onClose, you might need to simulate that action here
    // For example, if there's a close button in your form, you would do:
    // fireEvent.click(screen.getByText('CloseButton'));
  });

  it('changes selected list on item click', () => {
    render(<ListNavigation lists={mockLists} selectedListId={1} changeSelectedListId={mockChangeSelectedListId} />);
    fireEvent.click(screen.getByText('List 2'));
    expect(mockChangeSelectedListId).toHaveBeenCalledWith(2);
  });
});