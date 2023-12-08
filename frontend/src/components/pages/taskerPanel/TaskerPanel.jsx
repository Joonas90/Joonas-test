import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setTasks } from "../../../redux/actions/taskActions";
import { createTask } from "../../../axios/customAxios";
import "./TaskerPanel.scss";

export default function TaskerPanel() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskState.tasks);

    // New state variables for handling messages
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    // Section 1: Create Task
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: 1, // Default priority
        status: "ACTIVE", // Default status
    });

    const handleCreateTask = async () => {
        // Clear previous messages
        setMessage(null);
        setMessageType(null);

        // Validate required fields
        if (!newTask.title.trim() || !newTask.description.trim()) {
            setMessage("Title and description are required");
            setMessageType("error");
            return;
        }

        dispatch(setLoading(true));

        try {
            // Call your API function to create a task
            const accessToken = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };

            const createdTask = await createTask(newTask, headers);

            // Update the tasks in the Redux store
            dispatch(setTasks([...tasks, createdTask]));

            // Display success message
            setMessage("Task created successfully");
            setMessageType("success");

            // Clear the input fields
            setNewTask({
                title: "",
                description: "",
                priority: 1,
                status: "ACTIVE",
            });
        } catch (error) {
            // Display error message
            setMessage("Failed to create a task");
            setMessageType("error");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="tasker-panel">
            {/* Section 1: Create Task */}
            <div className="create-task-section">
                <h2>Create Task</h2>
                {/* Display messages */}
                {message && <div className={`message ${messageType}`}>{message}</div>}

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />

                <label htmlFor="priority">Priority:</label>
                <input
                    type="number"
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value) || 1 })}
                />

                <button onClick={handleCreateTask}>Create Task</button>
            </div>
        </div>
    );
}
