// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import { useContext } from 'react';



export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {

        const result = await Client.find({ _id: req.body.id })

        res.json(result)
    }

}

