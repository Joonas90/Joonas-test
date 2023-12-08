import mongoose, { Document, Schema } from "mongoose";

//Create an interface representing a task in MongoDB and export it
interface TaskAttributes {
    id: string;
    title: string;
    description: string;
    priority: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    status: string;
    userId: string;
}

interface TaskDocument extends Omit<TaskAttributes, "id">, Document {
    id: string;
}

//Create a Schema corresponding to the document interface.
const taskSchema = new Schema<TaskDocument>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true },
    createdAt: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedAt: { type: String, required: true },
    updatedBy: { type: String, required: true },
    status: { type: String, required: true },
    userId: { type: String, required: true },
});

//Create a Model.
const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

//Export the Model and the Document interface
export { TaskModel };
export type { TaskAttributes, TaskDocument };