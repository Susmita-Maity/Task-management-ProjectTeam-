import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from '../api';
import { notify } from '../utils';
import styles from './TaskManager.module.css';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            // Update API call
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            };
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call');
            // Create API call
            handleAddTask();
        }
        setInput('');
        fetchAllTasks();
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        };
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                // Show success toast
                notify(message, 'success');
            } else {
                // Show error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                // Show success toast
                notify(message, 'success');
            } else {
                // Show error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
        
    };

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                // Show success toast
                notify(message, 'success');
            } else {
                // Show error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                // Show success toast
                notify(message, 'success');
            } else {
                // Show error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    };

    return (
        <div className={styles.taskManager}>
            <h1 className={styles.heading}>Task Manager App</h1>
            {/* Input and Search box */}
            <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.input}
                        placeholder='Add a new Task'
                    />
                    <button
                        onClick={handleTask}
                        className={styles.addButton}
                    >
                        <FaPlus />
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.searchIcon}>
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        className={styles.input}
                        type='text'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            {/* List of items */}
            <div className={styles.taskList}>
                {tasks.map((item) => (
                    <div key={item._id} className={`${styles.taskItem} ${item.isDone ? styles.done : ''}`}>
                        <span className={styles.taskName}>
                            {item.taskName}
                        </span>

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => handleCheckAndUncheck(item)}
                                className={styles.checkButton}
                                type='button'
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={() => setUpdateTask(item)}
                                className={styles.editButton}
                                type='button'
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(item._id)}
                                className={styles.deleteButton}
                                type='button'
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toastify */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
}

export default TaskManager;
