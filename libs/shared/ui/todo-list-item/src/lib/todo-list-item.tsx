import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import styles from './todo-list-item.module.css';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { TodoListItemForm } from '@ender-apprentice/shared/ui/todo-list-item-form';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';

type TodoListItemProps = {
  item: TodoListItemType;
};

const TodoListItem = ({ item }: TodoListItemProps): JSX.Element => {
  const store = useTodoStore();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

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

  const toggleItemComplete = async () => {
    await store.updateTodo({
      ...item,
      isComplete: !item.isComplete,
    });
  };

  return (
    <div className={styles.todoListItemContainer}>
      <div className={styles.collapsedView}>
        <div className={styles.previewInfo}>
          <input type="checkbox" checked={item.isComplete} onChange={toggleItemComplete} />
          <div>{item.title}</div>
        </div>
        <div className={styles.previewInfo}>
          <EditIcon onClick={openModal} />
          {detailsVisible ? (
            <KeyboardArrowUpIcon onClick={hideDetails} />
          ) : (
            <KeyboardArrowDownIcon onClick={showDetails} />
          )}
        </div>
      </div>
      {detailsVisible && (
        <div className={styles.detailsContainer}>
          <div>
            {item.description}
            {!item.description.length && 'No details to display.'}
          </div>
        </div>
      )}
      <Modal opened={modalOpened} onClose={closeModal} title="Edit item">
        <TodoListItemForm listId={item.listId} />
      </Modal>
    </div>
  );
};

export { TodoListItem };
export type { TodoListItemProps };
