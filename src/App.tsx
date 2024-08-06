import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Typography } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/todoList';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Todo Application
      </Typography>
      <AddTodo />
      <TodoList />
    </Container>
  );
}

export default App;
