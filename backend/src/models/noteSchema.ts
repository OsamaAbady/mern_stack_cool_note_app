import { InferSchemaType, model, Schema } from "mongoose";

const newschema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true},
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof newschema>;

export default model<Note>("Note" , newschema);