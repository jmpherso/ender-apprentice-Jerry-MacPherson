# Ender Apprenticeship Challenge

## Getting Started

### Setup

If you don't already have node v20 installed, we recommend using volta:
`curl https://get.volta.sh | bash`
`volta install node@20`

If you don't already have pnpm installed, use volta to install it:
`volta install pnpm`

Use pnpm to install the project dependencies:
`pnpm install`

Recommended Browser: Chrome

### Running locally

Start:
`pnpm run start`

You will see the app running at localhost:4200.

### You may run into

The need to reset the nx workspace cache occasionally.

In the terminal, run:
`pnpm nx reset`

## Project Instructions & Requirements for Completion

### CSS

Using CSS, please fix the following UI bugs.

[ ] Hide (but do not remove) both scroll bars
[ ] Fix the alignment of the `+` button on the `ListNavigation` component.
[ ] Center the Add/Save button on form components.
[ ] Add 8px of space between each form element on the `ListFormModal` component.
[ ] Improve the spacing and alignment of each `ListNavigationItem` component.

### Code Style/Linting fixes

Command: `pnpm nx run-many --target=lint --parallel 6`
[ ] Fix all linting errors and warnings.

### Types

Make sure that every method, useState declaration, and component declaration has correct typing. Create new types as necessary. Do not typecast as `any` or `unknown` to satisfy the linter.

[ ] ListNavigationItem
[ ] TodoList
[ ] ListNavigation
[ ] TodoListItem
[ ] HomePage
[ ] AddEditListModal

### Write unit tests for every method on every React component using Vitest.

Some examples have been added to get you started. Test beyond the happy path for each method and come up with as many edge case scenarios to test as you can.

[ ] ListNavigationItem
[ ] TodoList
[ ] ListNavigation
[ ] TodoListItem
[ ] HomePage
[ ] AddEditListModal

### Component Library Migration

Replace the following Mantine components with corresponding elements from the ShadCN component library.

[ ] Button
[ ] Tooltip

### Bonus: Web Dev Bug

[ ] fix the edit item bug such that the form in the modal pre-populates with the item's information.
[ ] make the modal close on submit in all three use cases (new list, edit list, new list item).
