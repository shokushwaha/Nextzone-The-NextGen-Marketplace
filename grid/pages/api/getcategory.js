// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';




export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {

        const result = await Category.find({ _id: req.body.id })

        res.json(result)
    }

}

