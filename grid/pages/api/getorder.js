// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import { useContext } from 'react';



export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
        const { id } = req.body;
        const result = await Client.findById({ _id: id })

        res.json(result)
    }

}

