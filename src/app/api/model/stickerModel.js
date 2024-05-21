import { Schema, model, models } from "mongoose";

const stickerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
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
    },
    stickerFamilyId: {
        type: Schema.Types.ObjectId,
        ref: "stickerFamilies"
    }
    ,
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const sticker = models.sticker || model('sticker', stickerSchema);
export default sticker;