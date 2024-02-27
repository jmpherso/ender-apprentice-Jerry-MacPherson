import { Button, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { TodoListType } from '@ender-apprentice/shared/types/todo-list';
import { useTodoStore } from '@ender-apprentice/shared/stores/todo';

interface TodoListFormProps {
  list?: TodoListType;
}

const TodoListForm = ({ list }: TodoListFormProps): JSX.Element => {
  const store = useTodoStore();
  const [formData, setFormData] = useState({
    listName: list ? list.title : '',
    listDescription: list ? list.description : '',
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

    if (list) {
      list.description = formData.listDescription;
      list.title = formData.listName;
    } else {
      await store.createList({
        title: formData.listName,
        description: formData.listDescription,
        items: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="List Name"
        placeholder="Enter list name"
        value={formData.listName}
        onChange={handleChange}
        name="listName"
        required
      />
      <Textarea
        label="List Description"
        placeholder="Enter list description"
        value={formData.listDescription}
        onChange={handleChange}
        name="listDescription"
        rows={5}
        required
      />
      <Button type="submit" variant="outline" color="blue">
        {list ? 'Add list' : 'Save changes'}
      </Button>
    </form>
  );
};

export { TodoListForm };
