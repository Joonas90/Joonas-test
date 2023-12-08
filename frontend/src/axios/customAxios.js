// axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8001', // 
    timeout: 5000, // Set a timeout (optional)
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers if needed
    },
});

//Login call to backend
export const login = async (body) => {
    try {
        const response = await instance.post('/awesome/auth/login', body);
        return response;
    } catch (error) {
        console.log(error);
    }
};

//Register call to backend
export const register = async (body) => {

    try {
        const response = await instance.post('/awesome/applicant', body);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
};

export const refreshToken = async (body) => {
    try {
        const response = await instance.post('/awesome/auth/refresh', body);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
}

export const createTask = async (taskData, headers) => {
    try {
        const response = await instance.post('/awesome/tasks/createTask', taskData, { headers });
        const createdTask = response.data.task;
        return createdTask;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
}

export const getTasks = async (headers) => {
    try {
        const response = await instance.get('/awesome/tasks/tasks', { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
}

export const deleteTask = async (taskId, headers) => {
    try {
        const response = await instance.delete(`/awesome/tasks/deleteTask?id=${taskId}`, { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
}

export const updateTask = async (taskId, body, headers) => {
    try {
        const response = await instance.put(`/awesome/tasks/updateTask?id=${taskId}`, body, { headers });
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so the caller can handle it
    }
};

//Get task by sending id as parameter