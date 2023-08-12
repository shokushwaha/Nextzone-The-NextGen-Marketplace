// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';


export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === "POST") {

        const { id, name, email, phoneNum, address } = req.body;
        await Client.updateOne({ _id: id }, { name, email, phoneNum, address });
        res.json('success');
    }
}
