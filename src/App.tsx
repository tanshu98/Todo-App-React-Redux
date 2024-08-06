import React from 'react';
import './App.css';
import {  Stack, Typography } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/todoList';

function App() {
  return (
    <Stack gap={2} sx={{textAlign:'center'}}>
      <Typography variant="h4" gutterBottom>
        Todo Application
      </Typography>
      <AddTodo />
      <TodoList />
    </Stack >
  );
}

export default App;
