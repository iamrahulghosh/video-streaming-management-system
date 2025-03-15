import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    videoCount: {
        type: Number,
        default: 0
    },
    videoList: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    ownedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    publishStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Playlist = mongoose.model("Playlist", playlistSchema)

export default Playlist