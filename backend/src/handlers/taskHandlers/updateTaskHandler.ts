import { Request, Response } from 'express';
import logger from "../../logger/Logger";
import TaskService from "../../mongoCalls/taskCalls/taskService";
import { TaskAttributes } from "../../models/Task";
import { validateSession, validateUserType, decodeToken } from "../../utils/utils";


//Function to get update a task
export const updateTaskHandler = async (req: Request, res: Response): Promise<void> => {

    try {

        //Create a new task service
        const taskServiceHere = new TaskService();

        //Log the request    
        logger.info(`Request to update a task\n`);

        //Get the token from the request headers
        const tokenHere: string = req.headers.authorization || '';
        const token = tokenHere.split(' ')[1];
        const user: Record<string, any> | null = decodeToken(token);

        //Validate the token
        logger.info(`Validating the token\n`);
        if (!token) {

            logger.error(`Token is required`);
            res.status(498).send({ message: 'Token is required' });
            return;

        }

        //Validate the session
        logger.info(`Validating the session\n`);
        const sessionValidated: boolean = await validateSession(user?.lastLogIn);
        if (!sessionValidated) {

            logger.error(`Invalid session`);
            res.status(440).send({ message: 'Invalid session' });
            return;

        }

        //Validate the userType
        const userType: string = user?.userType || '';
        logger.info(`Validating the userType\n`);
        const userTypeValidated: boolean = validateUserType(userType);
        if (!userTypeValidated) {
            res.status(400).send({ message: 'Invalid userType' });
            return;
        }

        //Get the user from the token
        logger.info(`Getting the user from the token\n`);
        const userId = user?.id || '';

        //Get the task id from the request params and validate
        logger.info(`Getting the task id from the request params\n`);
        const taskId = req.query.id as string || req.body;
        if (!taskId) {

            logger.error(`Task id is required`);
            res.status(400).send({ message: 'Task id is required' });
            return;

        }

        //Get the task from the db
        logger.info(`Getting the task from the db\n`);
        await taskServiceHere.getTask(taskId).then(async (task: TaskAttributes | null) => {

            //Check if the task exists
            if (!task) {

                logger.error(`Task not found`);
                res.status(400).send({ message: 'Task not found' });
                return;

            }

            //Check if the task belongs to the user
            logger.info(`Checking if the task belongs to the user\n`);
            if (task.userId !== userId) {

                logger.error(`Task does not belong to user`);
                res.status(400).send({ message: 'Task does not belong to user' });
                return;

            }

            //Update the task
            logger.info(`Updating the task\n`);

            //Get the task data from the request body
            const taskAttributes: Record<string, any> = req.body;
            taskAttributes.title = req.body.title;
            taskAttributes.description = req.body.description;
            taskAttributes.updatedAt = new Date().toISOString();
            taskAttributes.updatedBy = userId;
            taskAttributes.priority = req.body.priority;
            taskAttributes.id = taskId;
            taskAttributes.status = req.body.status;
            const taskData: TaskAttributes = taskAttributes as TaskAttributes;

            logger.info(`taskData: ${taskData}`);
            //Update the task
            logger.info(`Updating the task\n`);
            await taskServiceHere.updateTask(taskData).then((task: boolean | null) => {

                if (!task) {

                    logger.error(`Task not found`);
                    res.status(404).send({ message: 'Task not found' });
                    return;

                }

                logger.info(`Task updated successfully`);
                res.status(200).send({ message: `Task ${taskId} updated successfully`, result: "success", statusCode: 200 });
                return;

            }).catch((error) => {

                logger.error(`Error updating task:, ${error}`);
                throw error;

            });


        }).catch((error: any) => {

            logger.error(`Error fetching task:, ${error}`);
            throw error;

        });

    } catch (error) {

        logger.error(`Error updating task:, ${error}`);
        throw error;

    }

}
