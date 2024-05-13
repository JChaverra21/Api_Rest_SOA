import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Referencia a la colección de usuarios
const linkSchema = new Schema({
    // URL original
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    // URL corto
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Link = model("Link", linkSchema);