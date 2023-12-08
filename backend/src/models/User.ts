// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// Create an interface representing a user in MongoDB and export it
interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    userType: string;
    createdAt: string; // Add createdAt property
    updatedAt: string; // Add updatedAt property
    updatedBy: string; // Add updatedBy property
    lastLogin: string; // Add lastLogin property
    status: string; // Add status property

}

interface UserDocument extends Omit<UserAttributes, 'id'>, Document {
    id: string; // Add 'id' property with type string
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserDocument>({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    lastLogin: { type: String, required: true },
    status: { type: String, required: true },
});

// Create a Model.
const UserModel = mongoose.model<UserDocument>('User', userSchema);

// Export the Model and the Document interface
export { UserModel };
export type { UserAttributes, UserDocument };

