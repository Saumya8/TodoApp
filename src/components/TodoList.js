import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const maxTaskLength = 50;
  const maxDescriptionLength = 200;

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
            <Box display="flex" flexDirection="column" gap={2} width="100%">
              <TextField
                label="Task"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                inputProps={{ maxLength: maxTaskLength }}
                error={editTask.length > maxTaskLength}
                helperText={`Characters left: ${maxTaskLength - editTask.length}`}
              />
              {editTask.length > maxTaskLength && (
                <Typography variant="body2" color="error">
                  Task exceeds the maximum character limit.
                </Typography>
              )}
              <TextField
                label="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                inputProps={{ maxLength: maxDescriptionLength }}
                error={editDescription.length > maxDescriptionLength}
                helperText={`Characters left: ${maxDescriptionLength - editDescription.length}`}
              />
              {editDescription.length > maxDescriptionLength && (
                <Typography variant="body2" color="error">
                  Description exceeds the maximum character limit.
                </Typography>
              )}
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button onClick={() => handleUpdate(index)} variant="contained" color="primary" disabled={editTask.length > maxTaskLength || editDescription.length > maxDescriptionLength}>
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
              <ListItemText
                primary={
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    {todo.task}
                  </Typography>
                }
                secondary={todo.description}
              />
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
