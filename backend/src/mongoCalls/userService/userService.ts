
import { UserModel, UserAttributes } from '../../models/User';
import logger from '../../logger/Logger';


//User service class
class UserService {

    //Create a user
    async createUser(userData: UserAttributes): Promise<UserAttributes> {

        try {

            const user = await UserModel.create(userData).then((user) => {

                logger.info(`User created:, ${user}`);
                return user

            }).catch((error) => {

                logger.error(`Error creating user:, ${error}`);
                throw error;

            });

            logger.info(`User created:, ${user}`);
            return user.toObject();

        } catch (error) {

            logger.error(`Error creating user:, ${error}`);
            throw error;

        }

    }

    //Get User or all users if no id is provided
    async getUser(id?: string): Promise<UserAttributes[]> {

        try {

            const user = await UserModel.find(id ? { _id: id } : {});
            //If more than one user is returned from the db, filter users and only return the ones with status 'active'


            const returnMessage = id ? `User found: ${user}` : `Users found: ${user}`;
            logger.info(returnMessage);
            return user;

        } catch (error) {

            logger.error(`Error fetching user:, ${error}`);
            throw error;

        }

    }

    //Get User by userName 
    async getUserByUserName(userName?: string, email?: string): Promise<UserAttributes | null> {

        try {

            const user = await UserModel.findOne({ $or: [{ username: userName }, { email: email }] });
            logger.info(`User found: ${user}`);
            return user;

        } catch (error) {

            logger.error(`Error fetching user:, ${error}`);
            throw error;

        }

    }

    // Update User
    async updateUser(userData: Record<string, any>): Promise<boolean> {

        try {

            const updated: boolean = await UserModel.findOne({ username: userData.username }).then((user) => {
                if (user) {

                    user.username = userData.username;
                    user.email = userData.email;
                    user.password = userData.password;
                    user.userType = userData.userType;
                    user.updatedAt = userData.updatedAt;
                    user.updatedBy = userData.updatedBy;
                    user.status = userData.status;
                    user.lastLogin = userData.lastLogin;
                    user.save();

                    logger.info(`User updated: ${user}`);

                    return true
                } else {

                    logger.info(`User not found: ${user}`);
                    return false
                }

            }).catch((error) => {

                logger.error(`Error updating user: ${error}`);
                return false;

            });

            return updated;

        } catch (error) {

            logger.error(`Error updating user: ${error}`);
            throw error;
        }
    }

    //Delete User
    async deleteUser(id: string): Promise<UserAttributes | null> {

        try {
            const user = await UserModel.findByIdAndDelete(id).lean();
            logger.info(`User deleted: ${user}`);
            return user as UserAttributes;
        } catch (error) {
            logger.error(`Error deleting user: ${error}`);
            throw error;
        }

    }

}


export default UserService;
