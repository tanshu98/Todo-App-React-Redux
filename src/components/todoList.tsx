import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { fetchTodos, updateTodo, deleteTodo } from '../redux/reducers/todoSlice';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

  const [editTodo, setEditTodo] = useState<{ id: number, todo: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleEditClick = (todo: { id: number, todo: string }) => {
    setEditTodo(todo);
    setOpenDialog(true);
  };

  const handleUpdateTodo = () => {
    if (editTodo) {
      dispatch(updateTodo({
        id: editTodo.id,
        todo: editTodo.todo,
        completed: false,
      }));
      setEditTodo(null);
      setOpenDialog(false);
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default',
          padding: 2,
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        position: 'relative',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Todo List
      </Typography>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              paddingY: 1,
              '&:last-of-type': {
                borderBottom: 'none',
              },
              backgroundColor: 'background.default',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={todo.todo}
              secondary={todo.completed ? 'Completed' : 'Pending'}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  color: 'text.primary',
                },
                '& .MuiListItemText-secondary': {
                  color: 'text.secondary',
                },
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '250px',
                textAlign: 'left',
                marginRight: 3,
                '&:hover': {
                  textOverflow: 'initial',
                  overflow: 'auto',
                  whiteSpace: 'normal',
                },
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditClick(todo)}
                sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo.id)}
                sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }}
              >
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
