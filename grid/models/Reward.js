// const { model, models, Schema } = require("mongoose");
// const RewardSchema = new Schema({
//     custWallet: { type: String, required: true },
//     couponName: { type: String, required: true },
//     couponSymbol: { type: String, required: true },
//     couponPrice: { type: Number, required: true },
//     expiryDate: { type: Date }


// }, {
//     timestamps: true
// });
// RewardSchema.index({ "expiryDate": 1 }, { expireAfterSeconds: 259200 })
// export const Reward = models?.Reward || model('Reward', RewardSchema);


const { model, models, Schema } = require("mongoose");
const RewardSchema = new Schema({
    custWallet: { type: String, required: true },
    couponName: { type: String, required: true },
    couponSymbol: { type: String, required: true },
    couponPrice: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    expiryDate: { type: Date },


}, {
    timestamps: true
});

export const Reward = models?.Reward || model('Reward', RewardSchema);
