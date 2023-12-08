import { TaskModel, TaskAttributes } from "../../models/Task";
import logger from "../../logger/Logger";


//Task service class
class TaskService {

    //Create a task
    async createTask(taskData: TaskAttributes): Promise<TaskAttributes> {

        try {

            const task = await TaskModel.create(taskData).then((task) => {

                logger.info(`Task created:, ${task}`);
                return task

            }).catch((error) => {

                logger.error(`Error creating task:, ${error}`);
                throw error;

            })

            logger.info(`Task created:, ${task}`);
            return task.toObject();

        } catch (error) {

            logger.error(`Error creating task:, ${error}`);
            throw error;

        }

    }

    //Get Task 
    async getTask(id?: string): Promise<TaskAttributes> {

        try {

            const task = await TaskModel.findOne({ _id: id }).then((task) => {
                logger.info(`Task found: ${task}`);
                return task;
            }).catch((error) => {
                logger.error(`Error fetching task:, ${error}`);
                throw error;
            });

            if (!task) {
                throw new Error('Task not found');
            }

            logger.info(`Task found: ${task}`);
            return task.toObject();

        } catch (error) {

            logger.error(`Error fetching task:, ${error}`);
            throw error;

        }

    }


    //Get Tasks by userId
    async getTasksByUserId(userId: string): Promise<TaskAttributes[]> {

        try {

            const tasks = await TaskModel.find({ userId: userId }).then((tasks) => {

                logger.info(`Tasks found: ${tasks}`);
                return tasks;

            }).catch((error) => {

                logger.error(`Error fetching tasks:, ${error}`);
                throw error;
            });

            logger.info(`Tasks found: ${tasks}`);
            return tasks;

        } catch (error) {

            logger.error(`Error fetching task:, ${error}`);
            throw error;

        }

    }

    //Update Task
    async updateTask(taskData: TaskAttributes): Promise<boolean> {

        try {

            const updated: boolean = await TaskModel.findOne({ _id: taskData.id }).then((task) => {

                if (task) {

                    task.title = taskData.title;
                    task.description = taskData.description;
                    task.updatedAt = new Date().toISOString();
                    task.updatedBy = taskData.updatedBy;
                    task.priority = taskData.priority;
                    task.status = taskData.status;
                    task.save();

                    logger.info(`Task updated: ${task}`);
                    return true;

                } else {

                    logger.info(`Task not found`);
                    return false;

                }

            }).catch((error) => {

                logger.error(`Error updating task: ${error}`);
                throw error;

            });

            return updated;

        } catch (error) {

            logger.error(`Error updating task: ${error}`);
            throw error;
        }

    }


    //Delete Task
    async deleteTask(id: string, userId: string): Promise<boolean> {

        try {

            const result: boolean = await TaskModel.find({ userId: userId }).then(async (tasks) => {
                logger.info(`Tasks found: ${tasks}`);

                //Check if the user has tasks
                if (tasks.length === 0) {

                    logger.info(`User has no tasks`);
                    return false;

                }

                //Check if the user has tasks
                if (tasks.length > 0) {

                    logger.info(`User has tasks`);

                    //match the task id
                    const task = tasks.filter((task) => task._id.toString() === id);

                    if (!task) {
                        logger.info(`Task not found`);
                        return false;
                    }

                    //Delete the task
                    await TaskModel.findByIdAndDelete({ _id: id }).then((task) => {
                        logger.info(`Task deleted: ${task}`);
                        return true;
                    }).catch((error) => {
                        logger.error(`Error deleting task:, ${error}`);
                        throw error;
                    });

                }

                // Add a default return value
                return true;
            }).catch((error) => {

                logger.error(`Error fetching tasks:, ${error}`);
                throw error;
            });

            logger.info(`Task deleted: ${id}`);
            return result;

        } catch (error) {

            logger.error(`Error deleting task: ${error}`);
            throw error;

        }

    }

}

export default TaskService;