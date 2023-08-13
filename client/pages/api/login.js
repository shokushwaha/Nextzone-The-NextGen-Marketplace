// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CartContext } from '@/components/CartContext';
import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import { loadComponents } from 'next/dist/server/load-components';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await mongooseConnect();
    const { email, password } = req.body;
    const user = await Client.findOne({ email });
    if (!user) {

        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

        throw new Error('Invalid password');
    }
    console.log(user);
    if (isPasswordValid)
        res.status(200).json(user);

    else {
        res.status(500).json(false);
    }

}
