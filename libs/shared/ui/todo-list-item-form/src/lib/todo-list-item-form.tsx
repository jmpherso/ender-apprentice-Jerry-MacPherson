import type { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { Button } from '../../../../../../components/ui/button';
import { TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import styles from './todo-list-item-form.module.css';

interface TodoListItemFormProps {
  readonly closeModal?: () => void;
  readonly item?: TodoListItemType;
  readonly listId: number;
}

interface FormData {
  readonly itemDescription: string;
  readonly itemName: string;
}

function TodoListItemForm({ closeModal, item, listId }: Readonly<TodoListItemFormProps>) {
  const store = useTodoStore();
  const [formData, setFormData] = useState<FormData>({
    itemDescription: item ? item.description : '',
    itemName: item ? item.title : '',
  });

  const handleChange = (event: Readonly<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>): void => {
    const { name, value } = event.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: Readonly<React.FormEvent<HTMLFormElement>>): void => {
    event.preventDefault();
    if (item) {
      store.updateTodo({
        ...item,
        description: formData.itemDescription,
        title: formData.itemName,
      });
    } else {
      store.createTodo({
        description: formData.itemDescription,
        isComplete: false,
        listId,
        title: formData.itemName,
      });
    }

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <form data-testid="todo-item-form" onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <TextInput
          label="Item Name"
          name="itemName"
          onChange={handleChange}
          placeholder="Enter item name"
          required
          value={formData.itemName}
        />
      </div>
      <div className={styles.formContainer}>
        <Textarea
          label="Item Description"
          name="itemDescription"
          onChange={handleChange}
          placeholder="Enter item description"
          rows={5}
          value={formData.itemDescription}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button color="blue" type="submit" variant="outline">
          {item ? 'Edit Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}

export { TodoListItemForm };
export type { TodoListItemFormProps };
