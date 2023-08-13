// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Reward } from '@/models/Reward';
import { mongooseConnect } from '@/lib/mongoose';
import { RedeemedReward } from '@/models/RedemmedReward';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {

        const { amt } = req.body;

        const redeemed = await Reward.findOne({ couponPrice: amt });
        const tok = await Reward.deleteOne({ couponPrice: amt });
        const redeemdReward = new RedeemedReward({
            custWallet: redeemed.custWallet,
            couponName: redeemed.couponName,
            couponPrice: redeemed.couponPrice,
            couponSymbol: redeemed.couponSymbol,
            transactionHash: redeemed.transactionHash,
            usedOn: Date.now()
        });
        await redeemdReward.save();

        res.json(tok);
    }

}


