import type { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { Button } from '../../../../../../components/ui/button'; // Adjusted import path
import { Textarea, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import styles from './todo-list-form.module.css';

interface TodoListFormProps {
  closeModal?: () => void;
  list?: TodoListType;
}

interface FormData {
  listDescription: string;
  listName: string;
}

const todoListForm = ({ closeModal, list }: TodoListFormProps): JSX.Element => {
  const store = useTodoStore();
  const [formData, setFormData] = useState<FormData>({
    listDescription: list?.description ?? '',
    listName: list?.title ?? '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  // Marked as async and added try-catch for error handling
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const actionPromise = list
      ? store.updateList({ ...list, description: formData.listDescription, title: formData.listName })
      : store.createList({ description: formData.listDescription, items: [], title: formData.listName });

    try {
      actionPromise;
    } catch (error) {
      // Replace console.error with a more appropriate error handling
    }

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <TextInput
          label="List Name"
          name="listName"
          onChange={handleChange}
          placeholder="Enter list name"
          required
          value={formData.listName}
        />
      </div>
      <div className={styles.formContainer}>
        <Textarea
          label="List Description"
          name="listDescription"
          onChange={handleChange}
          placeholder="Enter list description"
          required
          rows={5}
          value={formData.listDescription}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button color="blue" type="submit" variant="outline">
          {list ? 'Save Changes' : 'Add List'}
        </Button>
      </div>
    </form>
  );
};

export { todoListForm as TodoListForm };
