// Import necessary tools and components
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for expect(...).toBeInTheDocument()
import { Home } from './home.page';

//Workaround for window.matchMedia error
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })
});

// Mock the useTodoStore hook
vi.mock('@ender-apprentice/shared/stores/todo', () => ({
  useTodoStore: vi.fn(() => ({
    getTodoList: vi.fn(),
  })),
}));

describe('HomePage component', () => {
  let getTodoListMock;

  beforeEach(() => {
    // Reset the mock for getTodoList before each test
    getTodoListMock = vi.fn();
    vi.mocked(useTodoStore).mockImplementation(() => ({
      getTodoList: getTodoListMock,
    }));
  });

  it('renders loading state initially', async () => {
    getTodoListMock.mockResolvedValueOnce([]);
    const { getByText } = render(<Home />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('eventually renders To-do List Manager', async () => {
    getTodoListMock.mockResolvedValueOnce([{ id: 1, title: 'My List', description: 'My Description', items: [] }]);
    const { getByText } = render(<Home />);
    await waitFor(() => expect(getByText('To-do List Manager')).toBeInTheDocument());
  });
});
