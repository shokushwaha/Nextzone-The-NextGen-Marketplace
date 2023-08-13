// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';



export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "DELETE") {
        await Client.findByIdAndDelete(req.body.id)
        res.json(true);
    }

}
