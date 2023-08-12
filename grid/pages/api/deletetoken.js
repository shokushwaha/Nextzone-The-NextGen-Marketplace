// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Reward } from '@/models/Reward';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {

        const { amt } = req.body;


        const tok = await Reward.deleteOne({ couponPrice: amt });

        console.log(tok)
        res.json(tok);
    }

}


