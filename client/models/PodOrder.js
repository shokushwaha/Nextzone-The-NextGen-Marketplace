import { model, models, Schema } from "mongoose";

const PodOrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: { type: Boolean, default: false },
}, {
    timestamps: true,
});

export const PodOrder = models?.PodOrder || model('PodOrder', PodOrderSchema);