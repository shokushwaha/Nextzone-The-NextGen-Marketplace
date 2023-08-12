import mongoose, { model, models, Schema } from "mongoose";

const PropertySchema = new Schema({
    name: String,
    values: String,
}, { timestamps: true });

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    properties: [PropertySchema],
}, { timestamps: true });

export const Category = models?.Category || mongoose.model('Category', CategorySchema);
