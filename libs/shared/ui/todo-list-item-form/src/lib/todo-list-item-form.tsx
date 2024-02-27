import { Button, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { TodoListItemType } from '@ender-apprentice/shared/types/todo-list-item';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import styles from './todo-list-item-form.module.css';

type TodoListItemFormProps = {
  item?: TodoListItemType;
  listId: number;
};

function TodoListItemForm({ listId, item }: TodoListItemFormProps) {
  const store = useTodoStore();
  const [formData, setFormData] = useState({
    itemName: item ? item.title : '',
    itemDescription: item ? item.description : '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(item) {
      await store.updateTodo({
        ...item,
        title: formData.itemName,
        description: formData.itemDescription,
      });
      return;
    } else {
      await store.createTodo({
        title: formData.itemName,
        description: formData.itemDescription,
        listId,
        isComplete: false,
      });
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
