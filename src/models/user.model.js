import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    followingCount: {
        type: Number,
        default: 0
    },
    followerCount: {
        type: Number,
        default: 0
    },
    totalUploadedVideo: {
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String,
        default: "Profile picture has not been uploaded yet!"  // cloudinary url
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    } else {
        next()
    }
})

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.AUTH_TOKEN_SECRET,
        {
            expiresIn: process.env.AUTH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User