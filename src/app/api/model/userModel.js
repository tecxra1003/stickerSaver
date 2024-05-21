import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,


    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: ""

    },
    type: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;