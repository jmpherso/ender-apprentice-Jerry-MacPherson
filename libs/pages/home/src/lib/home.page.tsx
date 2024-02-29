import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { ListNavigation } from '@ender-apprentice/shared/ui/list-navigation';
import { TodoList } from '@ender-apprentice/shared/ui/todo-list';
import { useEffect, useState } from 'react';
import styles from './home.page.module.css';

function Home(): JSX.Element {
  const store = useTodoStore();
  const [lists, setLists] = useState<TodoListType[]>([]);
  const [selectedListId, setSelectedListId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const list = await store.getTodoList();
      setLists(list);
    })();
  }, [store]);

  const changeSelectedListId = (id: number) => {
    setSelectedListId(id);
  };

  if (lists.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.homePageContainer}>
      <h1>To-do List Manager</h1>
      <div className={styles.appContainer}>
        <ListNavigation changeSelectedListId={changeSelectedListId} lists={lists} selectedListId={selectedListId} />
        <TodoList list={lists[selectedListId]} />
      </div>
    </div>
  );
}

export { Home };
