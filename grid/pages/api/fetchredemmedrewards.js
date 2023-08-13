// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { RedeemedReward } from '@/models/RedemmedReward';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {
        const { currentAccount } = req.body;
        const tokens = await RedeemedReward.find({ custWallet: currentAccount });
        res.json(tokens);
    }

}


