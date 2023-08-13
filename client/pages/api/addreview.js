// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useContext } from 'react';



export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    // const {loggedInUser}=useContext(CartContext);
    // console.log(req.body.id)
    // console.log(req.body.productId);
    if (method === "POST") {

        await Product.updateOne({ _id: req.body.productId }, {
            $push: { reviews: req.body.review }
        })
        res.json(true)
    }

}

