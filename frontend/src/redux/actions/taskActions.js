
export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    payload: tasks,
});

export const setTask = (task) => ({
    type: 'SET_TASK',
    payload: task,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});

export const setActiveTasks = (activeTasks) => ({
    type: 'SET_ACTIVE_TASKS',
    payload: activeTasks,
});

export const setCompletedTasks = (completedTasks) => ({
    type: 'SET_COMPLETED_TASKS',
    payload: completedTasks,
});

export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
});

export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
});

export const updateTasks = (task) => ({
    type: 'UPDATE_TASKS',
    payload: task,
});



