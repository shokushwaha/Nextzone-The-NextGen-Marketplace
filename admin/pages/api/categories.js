import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdmin } from "./isAdmin";

const handler = async (req, res) => {
    const { method } = req;

    await mongooseConnect();

    if (method === "GET") {
        if (req.query?._id) {
            res.json(await Category.findOne({ _id: req.query?._id }));
        } else {
            res.json(await Category.find().populate('parent'));
        }
    } else if (method === "POST") {
        const { name, parent, properties } = req.body;
        const categoryDoc = await Category.create({
            name,
            parent,
            properties,
        });

        res.json(categoryDoc);
    } else if (method === "PUT") {
        const { _id, name, parent, properties } = req.body;
        const categoryDoc = await Category.updateOne(
            { _id },
            {
                name,
                parent,
                properties,
            }
        );

        res.json(categoryDoc);
    } else if (method === "DELETE") {
        const { _id } = req.query;
        if (_id) {
            await Category.deleteOne({ _id });
        }

        return res.json(true);
    }
}

export default isAdmin(handler);