// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { ProductHistory } from '@/models/ProductHistory';
export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'POST') {
        try {
            const { prodId, userId } = req.body;

            // Check if the user exists
            const user = await ProductHistory.findOne({ userId });

            if (user) {
                // Push the new product ID
                user.history.push(prodId);

                // Check if the history array has 6 entries
                if (user.history.length === 6) {
                    user.history.shift(); // Remove the oldest element
                }

                await user.save();
                res.json(user);
            } else {
                // Create a new user with the history array
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
