import express from 'express';

import { createTaskHandler } from '../handlers/taskHandlers/createTaskHandler';
import { getListOfTasksHandler } from '../handlers/taskHandlers/getListOfTasksHandler';
import { deleteTaskHandler } from '../handlers/taskHandlers/deleteTaskHandler';
import { updateTaskHandler } from '../handlers/taskHandlers/updateTaskHandler';


const taskRouter = express.Router();

taskRouter.post('/createTask', createTaskHandler);
taskRouter.get('/tasks', getListOfTasksHandler);
taskRouter.delete('/deleteTask', deleteTaskHandler);
taskRouter.put('/updateTask', updateTaskHandler);

export default taskRouter;