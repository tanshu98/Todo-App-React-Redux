import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/todoSlice';
import { TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { AppDispatch } from '../redux/store/store';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      try {
        const newTodo = {
          // id: 50,
          todo,
          completed,
          userId: 1, // Adjust based on your requirements
        };
        await dispatch(addTodo(newTodo)).unwrap();
        setTodo('');
        setError(null);
      } catch (err) {
        setError('Failed to add todo.');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          fullWidth
          margin="normal"
        />
         <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completed"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default AddTodo;
  