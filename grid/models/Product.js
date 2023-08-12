const { model, models, Schema } = require("mongoose");
import mongoose from "mongoose";
const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    discount: { type: Number, default: 0 },
    stars: { type: [Number], default: [] },
    reviews: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});
export const Product = models.Product || model('Product', ProductSchema);
