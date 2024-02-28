import { TextInput, Textarea } from '@mantine/core';
import { Button} from "../../../../../../components/ui/button"
import { useState } from 'react';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';
import styles from './todo-list-form.module.css';

interface TodoListFormProps {
  list?: TodoListType;
  closeModal?: () => void;
}

interface FormData {
  listName: string;
  listDescription: string;
}

const TodoListForm = ({ list, closeModal }: TodoListFormProps): JSX.Element => {
  const store = useTodoStore();
  const [formData, setFormData] = useState<FormData>({
    listName: list ? list.title : '',
    listDescription: list ? list.description : '',
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

    if(list) {
      store.updateList({
        ...list,
        title: formData.listName,
        description: formData.listDescription,
      });
    } else {
      store.createList({
        title: formData.listName,
        description: formData.listDescription,
        items: []
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
        label="List Name"
        placeholder="Enter list name"
        value={formData.listName}
        onChange={handleChange}
        name="listName"
        required
      />
      </div>
      <div className={styles.formContainer}>
      <Textarea
        label="List Description"
        placeholder="Enter list description"
        value={formData.listDescription}
        onChange={handleChange}
        name="listDescription"
        rows={5}
        required
      />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="outline" color="blue">
          {list ? 'Save Changes' : 'Add list'}
        </Button>
      </div>
    </form>
  );
};

export { TodoListForm };
