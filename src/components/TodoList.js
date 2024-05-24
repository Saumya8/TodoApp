import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].task);
    setEditDescription(todos[index].description);
  };

  const handleUpdate = (index) => {
    updateTodo(index, { task: editTask, description: editDescription });
    setEditIndex(null);
    setEditTask('');
    setEditDescription('');
  };

  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem key={index} style={{ display: 'flex', alignItems: 'center' }}>
          {editIndex === index ? (
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                label="Task"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
              <TextField
                label="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <Box display="flex" gap={1}>
                <Button onClick={() => handleUpdate(index)} variant="contained" color="primary">
                  Update
                </Button>
                <Button onClick={() => setEditIndex(null)} variant="contained" color="secondary">
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <IconButton onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTodo(index)}>
                <DeleteIcon />
              </IconButton>
              <ListItemText primary={`${todo.task}: ${todo.description}`} />
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
