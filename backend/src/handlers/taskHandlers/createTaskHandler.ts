import logger from "../../logger/Logger";
import TaskService from "../../mongoCalls/taskCalls/taskService";
import { TaskAttributes } from "../../models/Task";
import { validateSession, validateUserType, decodeToken } from "../../utils/utils";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { ACTIVE } from "../../utils/consts";

//Function to create a task
export const createTaskHandler = async (req: Request, res: Response): Promise<void> => {

    try {

        //Create a new task service
        const taskServiceHere = new TaskService();

        //Log the request    
        logger.info(`Request to create a task\n`);

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

        //Get the task data from the request body
        //Get the task data from the request body
        const title: string = req.body.title;
        const description: string = req.body.description;
        const priority: number = req.body.priority;

        //Validate the task data
        logger.info(`Validating the task data\n`);
        if (!title || !description) {

            logger.error(`Title and description are required`);
            res.status(400).send({ message: 'Title and description are required' });
            return;

        }


        //Create the task
        logger.info(`Creating the task\n`);
        const newTask: TaskAttributes = {
            id: uuidv4(),
            title: title,
            description: description,
            createdAt: new Date().toISOString(),
            createdBy: userId,
            priority: priority,
            updatedAt: "NOT UPDATED",
            updatedBy: "NOT UPDATED",
            status: ACTIVE,
            userId: userId
        }

        //Create the task
        await taskServiceHere.createTask(newTask).then((result: TaskAttributes) => {

            const response: Record<string, any> = {
                result: 'success',
                message: 'Task created',
                task: result,
                statusCOde: 200
            }

            res.status(200).send(response);

        }).catch((error) => {

            logger.error(`Error creating task:, ${error}`);
            throw error;

        });
    } catch (error) {

        logger.error(`Error creating task:, ${error}`);
        throw error;

    }

}