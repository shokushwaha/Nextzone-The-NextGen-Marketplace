// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Reward } from '@/models/Reward';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {

        const { currentAccount } = req.body;
        console.log("hi")
        console.log(currentAccount)
        console.log("hi")
        const tokens = await Reward.find({ custWallet: currentAccount });
        console.log(tokens)
        res.json(tokens);
    }

}


