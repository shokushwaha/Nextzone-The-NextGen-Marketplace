const { model, models, Schema } = require("mongoose");
const ProductHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    history: [{ type: Schema.Types.ObjectId, ref: 'Product' }],


}, {
    timestamps: true
});
export const ProductHistory = models?.ProductHistory || model('ProductHistory', ProductHistorySchema);
