import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

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
          error={!!errors.task}
          helperText={errors.task}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </form>
  );
}

export default TodoForm;
