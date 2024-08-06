import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../redux/reducers/todoSlice';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  console.log("todos in todoList Component",todos);
  
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);

  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id: number, todo: string } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  // const handleAddTodo = () => {
  //   if (newTodo.trim()) {
  //     dispatch(addTodo({ todo: newTodo, completed: false }));
  //     setNewTodo('');
  //   }
  // };

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
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <div style={{ marginBottom: '16px' }}>
        <TextField
          label="New Todo"
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ marginLeft: '8px' }}>
          Add Todo
        </Button>
      </div> */}

      <List>
        {todos.map((todo:any) => (
          <ListItem key={todo.todo}>
            <ListItemText primary={todo.todo} secondary={todo.completed ? 'Completed' : 'Pending'} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
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
    </div>
  );
};

export default TodoList;
