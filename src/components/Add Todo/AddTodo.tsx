import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/reducers/todoSlice';
import { TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import { AppDispatch } from '../../redux/store/store';
import { addTodoStyles } from '../Add Todo/AddTodoStyles'; // Adjust the import path

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
          todo,
          completed,
          userId: 1, 
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
    <Box sx={addTodoStyles.container}>
      <Typography variant="h5" sx={addTodoStyles.heading}>
        Add New Todo
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={addTodoStyles.textFieldContainer}>
          <TextField
            label="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            sx={addTodoStyles.textField}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              sx={addTodoStyles.checkbox}
            />
          }
          label="Completed"
          sx={addTodoStyles.formControlLabel}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={addTodoStyles.button}
        >
          Add Todo
        </Button>
      </form>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          sx={addTodoStyles.snackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AddTodo;
