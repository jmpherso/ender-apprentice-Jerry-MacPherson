import AddIcon from '@mui/icons-material/Add';
import styles from './list-navigation.module.css';
import { Button} from "../../../../../../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../components/ui/tooltip"
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <AddIcon onClick={openModal} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className={styles.tooltipContent}>Add new list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={styles.navbarMain}>{navList}</div>
      <Modal opened={modalOpened} onClose={closeModal} title={'New list'}>
        <TodoListForm closeModal={closeModal}/>
      </Modal>
    </nav>
  );
}

export { ListNavigation };
export type { ListNavigationProps };
