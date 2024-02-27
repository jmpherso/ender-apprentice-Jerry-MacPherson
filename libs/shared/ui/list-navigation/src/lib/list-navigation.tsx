import AddIcon from '@mui/icons-material/Add';
import styles from './list-navigation.module.css';
import { Button, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { Modal } from '@ender-apprentice/shared/ui/modal';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { TodoListForm } from '@ender-apprentice/shared/ui/todo-list-form';
import { ListNavigationItem } from '@ender-apprentice/shared/ui/list-navigation-item';

type ListNavigationProps = {
  lists: TodoListType[];
  selectedListId: number;
  changeSelectedListId: (id: number) => void;
};

function ListNavigation({ lists, selectedListId, changeSelectedListId }: ListNavigationProps) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = (): void => {
    setModalOpened(true);
  };

  const closeModal = (): void => {
    setModalOpened(false);
  };

  const navList = lists.map((list, index) => (
    <div
      key={index}
      onClick={(event) => {
        changeSelectedListId(list.id);
      }}>
      <ListNavigationItem list={list} selectedListId={selectedListId} />
    </div>
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navHeader}>
        <h2>All Lists</h2>
        <Tooltip label="Add new to-do list">
          <Button size="sm" variant="outline" onClick={openModal}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <div className={styles.navbarMain}>{navList}</div>
      <Modal opened={modalOpened} onClose={closeModal} title={'New list'}>
        <TodoListForm />
      </Modal>
    </nav>
  );
}

export { ListNavigation };
export type { ListNavigationProps };
