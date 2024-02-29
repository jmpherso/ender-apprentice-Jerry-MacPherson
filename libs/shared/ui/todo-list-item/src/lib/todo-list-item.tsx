import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListItemForm } from '@ender-apprentice/shared/ui/todo-list-item-form';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

import styles from './todo-list-item.module.css';

interface TodoListItemProps {
  item: TodoListItemType;
}

const TodoListItem = ({ item }: TodoListItemProps): JSX.Element => {
  const store = useTodoStore();
  const [isDetailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = (): void => {
    setModalOpened(true);
  };

  const closeModal = (): void => {
    setModalOpened(false);
  };

  const showDetails = () => {
    setDetailsVisible(true);
  };

  const hideDetails = () => {
    setDetailsVisible(false);
  };

  const toggleItemComplete = (): void => {
    store.updateTodo({
      ...item,
      isComplete: !item.isComplete,
    });
  };

  return (
    <div className={styles.todoListItemContainer}>
      <div className={styles.collapsedView}>
        <div className={styles.previewInfo}>
          <input checked={item.isComplete} onChange={toggleItemComplete} type="checkbox" />
          <div>{item.title}</div>
        </div>
        <div className={styles.previewInfo}>
          <EditIcon onClick={openModal} />
          {isDetailsVisible ? (
            <KeyboardArrowUpIcon data-testid="arrow button" onClick={hideDetails} />
          ) : (
            <KeyboardArrowDownIcon onClick={showDetails} />
          )}
        </div>
      </div>
      {isDetailsVisible && (
        <div className={styles.detailsContainer}>
          <div>
            {item.description}
            {item.description.length === 0 && 'No details to display.'}
          </div>
        </div>
      )}
      <Modal onClose={closeModal} opened={isModalOpened} title="Edit item">
        <TodoListItemForm closeModal={closeModal} item={item} listId={item.listId} />
      </Modal>
    </div>
  );
};

export { TodoListItem };
export type { TodoListItemProps };
