import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListNavigationItem } from './list-navigation-item';
import styles from './list-navigation-item.module.css';

// Mock ChecklistIcon since it's from an external library
vi.mock('@mui/icons-material/Checklist', () => ({
  __esModule: true,
  default: () => <div>ChecklistIcon</div>, // Mock component for the icon
}));

describe('ListNavigationItem component', () => {
  const list = { id: 1, title: 'Test List' };

  it('renders the list title', () => {
    render(<ListNavigationItem list={list} selectedListId={0} />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('applies selected style when list is selected', () => {
    render(<ListNavigationItem list={list} selectedListId={1} />);
    const listItem = screen.getByText('Test List').parentNode;
    expect(listItem).toHaveClass(styles.selectedList);
  });

  it('does not apply selected style when list is not selected', () => {
    render(<ListNavigationItem list={list} selectedListId={2} />);
    const listItem = screen.getByText('Test List').parentNode;
    expect(listItem).not.toHaveClass(styles.selectedList);
    expect(listItem).toHaveClass(styles.list);
  });
});