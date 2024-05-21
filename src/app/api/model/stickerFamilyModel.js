import { Schema, model, models } from "mongoose";

const stickerFamilySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    isCustom: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
    ,
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const stickerFamily = models.stickerFamily || model('stickerFamily', stickerFamilySchema);
export default stickerFamily;