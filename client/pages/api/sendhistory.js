// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { ProductHistory } from '@/models/ProductHistory';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        try {
            const { prodId, userId } = req.body;
            const user = await ProductHistory.findOne({ userId });

            if (user) {

                if (user.history.includes(prodId)) {
                    return;
                }

                user.history.push(prodId);
                if (user.history.length === 11) {
                    user.history.shift();
                }

                await user.save();
                res.json(user);
            } else {

                const newUser = new ProductHistory({
                    userId,
                    history: [prodId],
                });

                await newUser.save();
                res.json(newUser);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}