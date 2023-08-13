// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';


export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === "POST") {

        const { id, stars } = req.body;
        await Product.updateOne({ _id: id }, {
            $push: { stars: stars }
        })
        res.json(true)
    }
}
