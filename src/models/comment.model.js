import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    commentedText: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment