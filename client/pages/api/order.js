// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import { useContext } from 'react';



export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;


    if (method === "POST") {

        console.log(req.body.cartProducts);
        const orderArr = req.body.cartProducts;
        for (const order of orderArr) {
            await Client.updateOne({ _id: req.body.id }, {
                $push: { orders: order }
            })
        }
        res.json('success')


    }

}
