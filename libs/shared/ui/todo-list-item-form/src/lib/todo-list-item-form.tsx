import { Button, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import styles from './todo-list-item-form.module.css';

type TodoListItemFormProps = {
  item?: TodoListItemType;
  listId: number;
  closeModal?: () => void
};

interface FormData {
  itemName: string;
  itemDescription: string;
}

function TodoListItemForm({ listId, item, closeModal }: TodoListItemFormProps) {
  const store = useTodoStore();
  const [formData, setFormData] = useState<FormData>({
    itemName: item ? item.title : '',
    itemDescription: item ? item.description : '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if(item) {
      await store.updateTodo({
        ...item,
        title: formData.itemName,
        description: formData.itemDescription,
      });
    } else {
      await store.createTodo({
        title: formData.itemName,
        description: formData.itemDescription,
        listId,
        isComplete: false,
      });
    }

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <TextInput
          label="Item Name"
          placeholder="Enter item name"
          value={formData.itemName}
          onChange={handleChange}
          name="itemName"
          required
        />
      </div>
      <div className={styles.formContainer}>
        <Textarea
          label="Item Description"
          placeholder="Enter item description"
          value={formData.itemDescription}
          onChange={handleChange}
          name="itemDescription"
          rows={5}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="outline" color="blue">
          {item ? 'Edit Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}

export { TodoListItemForm };
export type { TodoListItemFormProps };
