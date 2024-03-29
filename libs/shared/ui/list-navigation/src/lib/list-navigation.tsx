import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { ListNavigationItem } from '@ender-apprentice/shared/ui/list-navigation-item';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListForm } from '@ender-apprentice/shared/ui/todo-list-form';
import { Button } from '../../../../../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../../../components/ui/tooltip';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import styles from './list-navigation.module.css';

interface ListNavigationProps {
  readonly changeSelectedListId: (id: number) => void;
  readonly lists: readonly TodoListType[]; // Adjusted for readonly type example
  readonly selectedListId: number;
}

function ListNavigation({ changeSelectedListId, lists, selectedListId }: ListNavigationProps) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false); // Renamed following naming convention

  const openModal = (): void => {
    setIsModalOpened(true);
  };

  const closeModal = (): void => {
    setIsModalOpened(false);
  };

  const navList = lists.map((list, index) => (
    <div
      key={index}
      onClick={() => {
        // Removed unused 'event' parameter
        changeSelectedListId(list.id);
      }}>
      <ListNavigationItem list={list} selectedListId={selectedListId} />
    </div>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navHeader}>
        <h2>All Lists</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button data-testid="add-list-button" onClick={openModal} variant="outline">
                <AddIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className={styles.tooltipContent}>Add new list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={styles.navbarMain}>{navList}</div>
      <Modal onClose={closeModal} opened={isModalOpened} title={'New list'}>
        <TodoListForm closeModal={closeModal} />
      </Modal>
    </nav>
  );
}

export { ListNavigation };
export type { ListNavigationProps };
