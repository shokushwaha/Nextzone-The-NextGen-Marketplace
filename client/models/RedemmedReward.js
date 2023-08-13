const { model, models, Schema } = require("mongoose");
const RedeemedRewardSchema = new Schema({
    custWallet: { type: String, required: true },
    couponName: { type: String, required: true },
    couponSymbol: { type: String, required: true },
    couponPrice: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    usedOn: { type: Date },


}, {
    timestamps: true
});

export const RedeemedReward = models?.RedeemedReward || model('RedeemedReward', RedeemedRewardSchema);
