
const initialState = {
    tasks: [],
    task: {},
    activeTasks: [],
    completedTasks: [],
    loading: false,
    error: null
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload.map(task => ({
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    // Add other necessary fields
                })),
            };
        case 'SET_TASK':
            return {
                ...state,
                task: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'SET_ACTIVE_TASKS':
            return {
                ...state,
                activeTasks: action.payload,
            };
        case 'SET_COMPLETED_TASKS':
            return {
                ...state,
                completedTasks: action.payload,
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload),
            };
        case 'UPDATE_TASKS':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task._id === action.payload._id) {
                        return {
                            ...task,
                            ...action.payload,
                        };
                    } else {
                        return task;
                    }
                }),
            };

        default:
            return state;
    }
}

export default taskReducer;