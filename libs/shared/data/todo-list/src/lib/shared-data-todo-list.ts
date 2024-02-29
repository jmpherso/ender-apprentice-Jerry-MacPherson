import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';

const todoListData: TodoListType[] = [
  { description: 'lore ipsum dolor etc etc etc', id: 0, items: [], title: 'Some feature!' },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 1,

    items: [
      {
        description: 'lore ipsum dolor',
        id: 0,
        isComplete: true,
        listId: 1,
        title: 'item 1',
      },
      {
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        id: 1,
        isComplete: false,
        listId: 1,
        title: 'item 2',
      },
      {
        description: 'lore ipsum dolor',
        id: 2,
        isComplete: false,
        listId: 1,
        title: 'item 3',
      },
    ],

    title: 'Apprenticeship Program',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 2,

    items: [
      {
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        id: 0,
        isComplete: true,
        listId: 2,
        title: 'item 4',
      },
      {
        description: 'lore ipsum dolor',
        id: 1,
        isComplete: true,
        listId: 2,
        title: 'item 5',
      },
      {
        description: 'lore ipsum dolor',
        id: 2,
        isComplete: true,
        listId: 2,
        title: 'item 6',
      },
    ],

    title: 'VA Onboarding',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 3,
    items: [],
    title: 'Code Review Process Improvement',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 4,
    items: [],
    title: 'Single Point APIs',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 5,
    items: [],
    title: 'Pubsite Overhaul',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 6,
    items: [],
    title: 'Frontend Interview Challenge',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 10,
    items: [],
    title: 'Extremely Long todo list title name just checking to see what happens',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 7,
    items: [],
    title: 'Design System Migration',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 8,
    items: [],
    title: 'Playwright Fixtures',
  },
  {
    description: 'lore ipsum dolor etc etc etc',
    id: 9,
    items: [],
    title: 'Tanstack Table Migration',
  },
  { description: 'lore ipsum dolor etc etc etc', id: 11, items: [], title: 'scroll????' },
];

export { todoListData };
