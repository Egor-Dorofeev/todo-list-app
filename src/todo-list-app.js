import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: taskInput, done: false }]);
            setTaskInput('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
    };

    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
