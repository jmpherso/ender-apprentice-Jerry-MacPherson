import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListForm } from '@ender-apprentice/shared/ui/todo-list-form';
import { TodoListItem } from '@ender-apprentice/shared/ui/todo-list-item';
import { TodoListItemForm } from '@ender-apprentice/shared/ui/todo-list-item-form';
import { Button, Tooltip } from '@mantine/core';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import styles from './todo-list.module.css';

interface TodoListProps {
  list: TodoListType;
}

function TodoList({ list }: TodoListProps) {
  const [showCompleteItems, setShowCompleteItems] = useState<boolean>(true);
  const [listModalOpened, setListModalOpened] = useState<boolean>(false);
  const [listItemModalOpened, setListItemModalOpened] = useState<boolean>(false);

  const openListModal = (): void => {
    setListModalOpened(true);
  };

  const closeListModal = (): void => {
    setListModalOpened(false);
  };

  const openListItemModal = (): void => {
    setListItemModalOpened(true);
  };

  const closeListItemModal = (): void => {
    setListItemModalOpened(false);
  };

  const toggleCompleteItemVisibility = (event) => {
    event.preventDefault();
    setShowCompleteItems(!showCompleteItems);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2>{list.title}</h2>
        <div className={styles.buttonContainer}>
          <Button onClick={toggleCompleteItemVisibility} size="sm" variant="outline">
            {showCompleteItems ? 'Hide' : 'Show'} Complete
          </Button>
          <Button onClick={openListModal} size="sm" variant="default">
            Edit details
          </Button>
        </div>
      </div>
      <div> {list.description} </div>
      <div className={styles.listItems}>
        {list.items.length > 0 ? (
          list.items.map((item) => <TodoListItem item={item} key={item.id} />)
        ) : (
          <p>No items to display.</p>
        )}
      </div>
      <Tooltip label="Add a new item to this list.">
        <Button className={styles.addItemButton} onClick={openListItemModal} size="sm" variant="outline">
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal onClose={closeListModal} opened={listModalOpened} title={'Edit list'}>
        <TodoListForm list={list} />
      </Modal>
      <Modal onClose={closeListItemModal} opened={listItemModalOpened} title={'Add item'}>
        <TodoListItemForm listId={list.id} />
      </Modal>
    </div>
  );
}

export { TodoList };
export type { TodoListProps };
