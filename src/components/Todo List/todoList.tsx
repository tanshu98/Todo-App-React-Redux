import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store';
import { fetchTodos, updateTodo, deleteTodo } from '../../redux/reducers/todoSlice';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { todoListStyles } from '../Todo List/TodoListStyles'; // Adjust the import path

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

  const [editTodo, setEditTodo] = useState<{ id: number; todo: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleEditClick = (todo: { id: number; todo: string }) => {
    setEditTodo(todo);
    setOpenDialog(true);
  };

  const handleUpdateTodo = () => {
    if (editTodo) {
      dispatch(
        updateTodo({
          id: editTodo.id,
          todo: editTodo.todo,
          completed: false,
        })
      );
      setEditTodo(null);
      setOpenDialog(false);
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  if (status === 'loading') {
    return (
      <Box sx={todoListStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={todoListStyles.errorContainer}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={todoListStyles.container}>
      <Typography variant="h5" sx={todoListStyles.heading}>
        Todo List
      </Typography>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} sx={todoListStyles.listItem}>
            <ListItemText
              primary={todo.todo}
              secondary={todo.completed ? 'Completed' : 'Pending'}
              sx={todoListStyles.listItemText}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(todo)} sx={todoListStyles.editButton}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)} sx={todoListStyles.deleteButton}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            type="text"
            fullWidth
            variant="outlined"
            value={editTodo?.todo || ''}
            onChange={(e) => setEditTodo({ ...editTodo, todo: e.target.value } as any)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTodo} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;
