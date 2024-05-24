import React, { useState } from 'react';
import './TodoList.css';  // Import the CSS file

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
    <ul>
      {todos.map((todo, index) => (
        <li key={index} className="todo-item">
          {editIndex === index ? (
            <div className="todo-buttons">
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={() => handleUpdate(index)}>Update</button>
              <button onClick={() => setEditIndex(null)}>Cancel</button>
            </div>
          ) : (
            <div className="todo-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <span className="todo-text">{todo.task}: {todo.description}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
