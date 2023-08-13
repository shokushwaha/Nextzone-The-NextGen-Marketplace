import { model, models, Schema } from "mongoose";

const AdminSchema = new Schema({
    email: String,

}, {
    timestamps: true,
});

export const Admin = models?.Admin || model('Admin', AdminSchema);