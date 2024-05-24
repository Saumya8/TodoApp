import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const maxTaskLength = 50;
  const maxDescriptionLength = 200;

  const validate = () => {
    const errors = {};
    if (!task) errors.task = 'Task is required';
    if (!description) errors.description = 'Description is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addTodo({ task, description });
      setTask('');
      setDescription('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          error={!!errors.task || task.length > maxTaskLength}
          helperText={
            errors.task ? errors.task : `Characters left: ${maxTaskLength - task.length}`
          }
          inputProps={{ maxLength: maxTaskLength }}
        />
        {task.length > maxTaskLength && (
          <Typography variant="body2" color="error">
            Task exceeds the maximum character limit.
          </Typography>
        )}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description || description.length > maxDescriptionLength}
          helperText={
            errors.description
              ? errors.description
              : `Characters left: ${maxDescriptionLength - description.length}`
          }
          inputProps={{ maxLength: maxDescriptionLength }}
        />
        {description.length > maxDescriptionLength && (
          <Typography variant="body2" color="error">
            Description exceeds the maximum character limit.
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </form>
  );
};

export default TodoForm;
