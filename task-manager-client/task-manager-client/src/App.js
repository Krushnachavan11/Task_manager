import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingTask) {
        await axios.put(`${API_URL}/${editingTask._id}`, { title });
        setEditingTask(null);
      } else {
        await axios.post(API_URL, { title });
      }
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingTask(task);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggle(task)} style={{ cursor: 'pointer' }}>
              {task.title}
            </span>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
