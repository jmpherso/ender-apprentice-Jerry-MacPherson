// Import necessary tools and components
import '@testing-library/jest-dom';

import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// for expect(...).toBeInTheDocument()
import { Home } from './home.page';

// Workaround for window.matchMedia error
Object.defineProperty(window, 'matchMedia', {
  value: (media) => ({
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => {},
    matches: false,
    media,
    onchange: null,
    removeEventListener: () => {},
    removeListener: () => {},
  }),

  writable: true,
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

  it('renders loading state initially', () => {
    getTodoListMock.mockResolvedValueOnce([]);

    const { getByText } = render(<Home />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('eventually renders To-do List Manager', async () => {
    getTodoListMock.mockResolvedValueOnce([
      {
        description: 'My Description',
        id: 1,
        items: [],
        title: 'My List',
      },
    ]);

    const { getByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText('To-do List Manager')).toBeInTheDocument();
    });
  });
});
