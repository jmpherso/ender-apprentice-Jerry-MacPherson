import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListForm } from '@ender-apprentice/shared/ui/todo-list-form';
import { TodoListItem } from '@ender-apprentice/shared/ui/todo-list-item';
import { TodoListItemForm } from '@ender-apprentice/shared/ui/todo-list-item-form';
import { Button } from '../../../../../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../../../components/ui/tooltip';
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

  const toggleCompleteItemVisibility = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
        {showCompleteItems
          ? list.items.map((item, index) => <TodoListItem item={item} key={index} />)
          : list.items
              .filter((item) => !item.isComplete)
              .map((item, index) => <TodoListItem item={item} key={index} />)}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={openListItemModal}>
              <AddIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className={styles.tooltipContent}>Add new item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal onClose={closeListModal} opened={listModalOpened} title={'Edit list'}>
        <TodoListForm closeModal={closeListModal} list={list} />
      </Modal>
      <Modal onClose={closeListItemModal} opened={listItemModalOpened} title={'Add item'}>
        <TodoListItemForm closeModal={closeListItemModal} listId={list.id} />
      </Modal>
    </div>
  );
}

export { TodoList };
export type { TodoListProps };
