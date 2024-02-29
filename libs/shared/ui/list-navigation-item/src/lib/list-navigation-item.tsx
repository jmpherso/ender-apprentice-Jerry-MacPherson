import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import ChecklistIcon from '@mui/icons-material/Checklist';

import styles from './list-navigation-item.module.css';

interface ListNavigationItemProps {
  readonly list: TodoListType;
  readonly selectedListId: number;
}

function ListNavigationItem({ list, selectedListId }: Readonly<ListNavigationItemProps>) {
  return (
    <div className={list.id === selectedListId ? styles.selectedList : styles.list}>
      <ChecklistIcon />
      <span className={styles.titleContainer}>{list.title}</span>
    </div>
  );
}

export { ListNavigationItem };
export type { ListNavigationItemProps };
