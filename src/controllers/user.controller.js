import AsyncHandler from "../utils/AsyncHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import fs from "fs"

const validImageMimeType = (mimeType) => {
    const validMimeType = [ "image/png", "image/jpeg" ]
    return validMimeType.includes(mimeType)
}

const createUser = AsyncHandler(async (req, res) => {
    const {
        fullname,
        email, 
        username,
        password
    } = req.body

    if (!fullname || !email || !username || !password) {
        throw new ErrorHandler(400, "All fields are required!")
    }

    if (fullname?.trim() == "") {
        throw new ErrorHandler(400, "Fullname cannot be empty!")
    }

    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email?.trim()?.toLowerCase())) {
        throw new ErrorHandler(400, "Invalid email address!")
    }

    if (username?.trim() == "") {
        throw new ErrorHandler(400, "Username cannot be empty!")
    }

    if (password?.trim() == "") {
        throw new ErrorHandler(400, "Password cannot be empty!")
    }

    if (password?.trim()?.length < 8) {
        throw new ErrorHandler(400, "Password must be at least 8 characters long!")
    }

    const isValidImage = validImageMimeType(req.files?.profilePic[0]?.mimetype)

    if (req.files && Array.isArray(req.files?.profilePic) && isValidImage == false) {
        fs.unlinkSync(req.files?.profilePic[0]?.path)
        throw new ErrorHandler(400, "Please upload a png or jpeg image")
    }

    // console.log(req.files)
    const profilePicture = req.files && Array.isArray(req.files?.profilePic) ? req?.files?.profilePic[0]?.path : null
    // console.log(profilePicture);

    const isExistedUser = await User.findOne({
        $or: [
            { username: username?.trim() },
            { email: email?.trim()?.toLowerCase() }
        ]
    })

    if (isExistedUser) {
        throw new ErrorHandler(400, "Username or email already exists!")
    }

    const response = profilePicture ? await uploadOnCloudinary(profilePicture) : false
    // console.log(response);

    const user = await User.create({
        fullname: fullname?.trim(),
        email: email?.trim()?.toLowerCase(),
        username: username?.trim(),
        password: password?.trim(),
        profilePicture: response ? response?.secure_url : "No profile picture is available"
    })

    const isUserCreated = await User.findById(user?._id)?.select("-password")

    if (!isUserCreated) {
        throw new ErrorHandler(500, "Something went wrong while creating user account!")
    }

    return res
    .status(201)
    .json(
        new ResponseHandler(200, isUserCreated, "User account created successfully!")
    )

})

export {
    createUser
}