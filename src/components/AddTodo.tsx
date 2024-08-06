import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/todoSlice';
import { TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import { AppDispatch } from '../redux/store/store';

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
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Add New Todo
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              marginBottom: 2,
              backgroundColor: 'background.default',
              borderRadius: 1
            }}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              sx={{ color: 'primary.main' }}
            />
          }
          label="Completed"
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', padding: '10px', borderRadius: 1 }}
        >
          Add Todo
        </Button>
      </form>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          sx={{ marginTop: 2 }}
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
