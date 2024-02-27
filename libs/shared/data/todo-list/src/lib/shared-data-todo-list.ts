import { TodoListType } from '@ender-apprentice/shared/types/todo-list';

const todoListData: TodoListType[] = [
  { title: 'Some feature!', id: 0, description: 'lore ipsum dolor etc etc etc', items: [] },
  {
    title: 'Apprenticeship Program',
    id: 1,
    description: 'lore ipsum dolor etc etc etc',
    items: [
      {
        title: 'item 1',
        id: 0,
        description: 'lore ipsum dolor',
        listId: 1,
        isComplete: true,
      },
      {
        title: 'item 2',
        id: 1,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        listId: 1,
        isComplete: false,
      },
      {
        title: 'item 3',
        id: 2,
        description: 'lore ipsum dolor',
        listId: 1,
        isComplete: false,
      },
    ],
  },
  {
    title: 'VA Onboarding',
    id: 2,
    description: 'lore ipsum dolor etc etc etc',
    items: [
      {
        title: 'item 4',
        id: 0,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        listId: 2,
        isComplete: true,
      },
      {
        title: 'item 5',
        id: 1,
        description: 'lore ipsum dolor',
        listId: 2,
        isComplete: true,
      },
      {
        title: 'item 6',
        id: 2,
        description: 'lore ipsum dolor',
        listId: 2,
        isComplete: true,
      },
    ],
  },
  {
    title: 'Code Review Process Improvement',
    id: 3,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Single Point APIs',
    id: 4,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Pubsite Overhaul',
    id: 5,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Frontend Interview Challenge',
    id: 6,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Extremely Long todo list title name just checking to see what happens',
    id: 10,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Design System Migration',
    id: 7,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Playwright Fixtures',
    id: 8,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  {
    title: 'Tanstack Table Migration',
    id: 9,
    description: 'lore ipsum dolor etc etc etc',
    items: [],
  },
  { title: 'scroll????', id: 11, description: 'lore ipsum dolor etc etc etc', items: [] },
];

export { todoListData };
