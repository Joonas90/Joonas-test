import logger from "../../logger/Logger";
import TaskService from "../../mongoCalls/taskCalls/taskService";
import { validateSession, validateUserType, decodeToken } from "../../utils/utils";
import { Request, Response } from 'express';


//Function to delete a task by id
export const deleteTaskHandler = async (req: Request, res: Response): Promise<void> => {

    try {

        //Create a new task service
        const taskServiceHere = new TaskService();

        //Log the request    
        logger.info(`Request to delete a task\n`);

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

        //Get the task id from the request params and validate
        logger.info(`Getting the task id from the request params\n`);
        const taskId = req.query.id as string || req.body;
        console.log(taskId);
        if (!taskId) {

            logger.error(`Task id is required`);
            res.status(400).send({ message: 'Task id is required' });
            return;

        }

        //Get the user from the token
        logger.info(`Getting the user from the token\n`);
        const userId = user?.id || '';

        //Delete the task
        logger.info(`Deleting the task\n`);
        await taskServiceHere.deleteTask(taskId, userId).then((task: boolean) => {

            if (!task) {

                logger.error(`Task not found`);
                res.status(404).send({ message: 'Task not found' });
                return;

            }

            logger.info(`Task deleted: ${taskId}`);
            res.status(200).send({ message: `Task ${taskId}  deleted`, statusCode: 200, result: "success" });

        }).catch((error: Error) => {

            logger.error(`Error deleting task: ${error}`);
            res.status(500).send({ message: 'Error deleting task' });

        });

    } catch (error) {

        logger.error(`Error deleting task: ${error}`);
        res.status(500).send({ message: 'Error deleting task' });

    }

}