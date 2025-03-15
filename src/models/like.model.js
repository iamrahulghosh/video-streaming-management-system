import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Like = mongoose.model("Like", likeSchema)

export default Like