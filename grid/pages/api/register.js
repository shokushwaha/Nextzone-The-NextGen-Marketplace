// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Client } from '@/models/Customer';
import bcrypt from 'bcryptjs'


export default async function handler(req, res) {
    await mongooseConnect();
    const { name, email, password, address, phoneNum } = req.body;

    const existingUser = await Client.findOne({ email });
    if (existingUser)
        throw new Erro('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Client({
        name,
        email,
        password: hashedPassword,
        address,
        phoneNum
    });

    await newUser.save();
    res.json(newUser);

}
