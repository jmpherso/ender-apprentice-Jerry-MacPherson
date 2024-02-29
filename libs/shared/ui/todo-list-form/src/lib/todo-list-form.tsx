import {useTodoStore} from '@ender-apprentice/shared/stores/todo';
import {TodoListType} from '@ender-apprentice/shared/types/todo-list';
import {Textarea, TextInput} from '@mantine/core';
import {useState} from 'react';
import {Button} from '../../../../../../components/ui/button';
import styles from './todo-list-form.module.css';

interface TodoListFormProps {
    closeModal?: () => void;
    list?: TodoListType;
}

interface FormData {
    listDescription: string;
    listName: string;
}

const TodoListForm = ({closeModal, list}): JSX.Element => {
    const store = useTodoStore();
    const [formData, setFormData] = useState<FormData>({
        listDescription: list ? list.description : '',
        listName: list ? list.title : '',
    });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = event.target;
        
        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
        if (list) {
            store.updateList({
                ...list,
                description: formData.listDescription,
                title: formData.listName,
            });
        }
 else {
            store.createList({
                description: formData.listDescription,
                items: [],
                title: formData.listName,
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
            {list ? 'Save Changes' : 'Add list'}
        </Button>
        </div>
        </form>
    );
};

export {
    TodoListForm,
};

