// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { ProductHistory } from '@/models/ProductHistory';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {
        const { userId } = req.body;

        const products = await ProductHistory.findOne({ userId: userId });

        let arr = []
        for (let i = 0; i < products?.history?.length; i++) {
            const temp = await Product.findOne({ _id: products.history[i] })
            arr.push(temp)
        }

        res.json(arr);
    }

}


