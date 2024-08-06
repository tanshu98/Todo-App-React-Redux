import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://dummyjson.com/todos';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.todos.splice(0,10);
});

export const addTodo = createAsyncThunk<Todo, Omit<Todo, 'id'>>('todos/addTodo', async (todo) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
});

export const updateTodo = createAsyncThunk<Todo, Todo>('todos/updateTodo', async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  console.log("data inside updateTodo", data);
  return data;
});

export const deleteTodo = createAsyncThunk<number, number>('todos/deleteTodo', async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
