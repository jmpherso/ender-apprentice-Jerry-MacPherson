import ChecklistIcon from '@mui/icons-material/Checklist';
import styles from './list-navigation-item.module.css';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';

type ListNavigationItemProps = {
  list: TodoListType;
  selectedListId: number;
};

function ListNavigationItem({ list, selectedListId }: ListNavigationItemProps) {
  return (
    <div className={list.id === selectedListId ? styles.selectedList : styles.list}>
      <ChecklistIcon />
      <span>{list.title}</span>
    </div>
  );
}

export { ListNavigationItem };
export type { ListNavigationItemProps };
