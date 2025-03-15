import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    ownedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoTitle: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    videoFile: {
        type: String,
        required: true  // cloudinary url
    },
    thumbnail: {
        type: String,
        required: true  // cloudinary url
    },
    duration: {
        type: Number,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    publishStatus: {
        type: Boolean,
        default: false
    }
})

const Video = mongoose.model("Video", videoSchema)

export default Video