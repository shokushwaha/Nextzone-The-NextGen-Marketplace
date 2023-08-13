const { model, models, Schema } = require("mongoose");
const ClientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNum: { type: Number, required: true },
    address: { type: String, required: true },
    orders: {
        type: [String],
        default: []
    },
    cart: {
        type: [String],
        default: []
    },

}, {
    timestamps: true
});
export const Client = models?.Client || model('Client', ClientSchema);
