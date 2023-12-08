import logger from "../../logger/Logger";
import TaskService from "../../mongoCalls/taskCalls/taskService";
import { TaskAttributes } from "../../models/Task";
import { validateSession, validateUserType, decodeToken } from "../../utils/utils";
import { Request, Response } from 'express';


//Function to get List of Tasks
export const getListOfTasksHandler = async (req: Request, res: Response): Promise<void> => {

    try {

        //Create a new task service
        const taskServiceHere = new TaskService();

        //Log the request    
        logger.info(`Request to get List of Tasks\n`);

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

        //Get list of tasks under user 
        logger.info(`Getting list of tasks under user\n`);
        await taskServiceHere.getTasksByUserId(userId).then((tasks: TaskAttributes[]) => {

            //Check if the user has tasks
            if (tasks.length === 0) {

                logger.info(`User has no tasks`);

                const response: Record<string, any> = {
                    message: 'User has no tasks',
                    result: "success",
                    statusCode: 200
                }

                res.status(200).send(response);
                return;

            }

            //Check if the user has tasks
            if (tasks.length > 0) {

                logger.info(`User has tasks`);

                const response: Record<string, any> = {
                    message: 'User has tasks',
                    tasks: tasks,
                    result: "success",
                    statusCode: 200
                }

                res.status(200).send(response);
                return;

            }

        }).catch((error) => {

            logger.error(`Error fetching tasks:, ${error}`);
            throw error;

        });

    } catch (error) {

        logger.error(`Error getting list of tasks:, ${error}`);
        throw error;

    }

}