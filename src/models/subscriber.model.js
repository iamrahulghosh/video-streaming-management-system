import mongoose, { Schema } from "mongoose";

const subscriberSchema = new Schema({
    subscribedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subscribedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Subscriber = mongoose.model("Subscriber", subscriberSchema)

export default Subscriber