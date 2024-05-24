import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const baseURL = 'http://127.0.0.1:5000/todos';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addTodo = (todo) => {
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(error => console.error('Error adding todo:', error));
  };

  const updateTodo = (index, updatedTodo) => {
    fetch(`${baseURL}/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })
      .then(response => response.json())
      .then(() => {
        const newTodos = [...todos];
        newTodos[index] = updatedTodo;
        setTodos(newTodos);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (index) => {
    fetch(`${baseURL}/${index}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
