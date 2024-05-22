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
        type: Boolean,
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
    },
    deletedAt:{
        type:Date
    }
},
    { timestamps: true });

const stickerFamily = models.stickerFamily || model('stickerFamily', stickerFamilySchema);
export default stickerFamily;