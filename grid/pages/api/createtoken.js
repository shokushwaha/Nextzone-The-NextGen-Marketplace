// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Reward } from '@/models/Reward';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {

        const { currentAccount, tokenName, tokenSymbol, amnt } = req.body;


        const newReward = new Reward({
            custWallet: currentAccount,
            couponName: tokenName,
            couponSymbol: tokenSymbol,
            couponPrice: amnt,
            expiryDate: new Date()
        });

        await newReward.save();
        res.json(newReward);
    }

}


