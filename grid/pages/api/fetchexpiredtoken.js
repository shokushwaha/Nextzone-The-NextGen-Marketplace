// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Reward } from '@/models/Reward';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {
        const { currentAccount } = req.body;
        const tokens = await Reward.find({ custWallet: currentAccount });
        const currentDate = new Date();
        const filteredTokens = tokens.filter(token => currentDate >= token.expiryDate);
        res.json(filteredTokens);
    }

}


