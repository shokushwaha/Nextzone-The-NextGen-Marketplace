import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdmin } from "./isAdmin";

const handler = async (req, res) => {
    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { title, description, price, images, category, properties, discount } =
            req.body;

        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category,
            properties,
            discount
        });
        res.json(productDoc);
    } else if (method === "PUT") {
        const { _id, title, description, price, images, category, properties, discount } =
            req.body;
        const productDoc = await Product.updateOne(
            { _id },
            {
                title,
                description,
                price,
                images,
                category,
                properties,
                discount
            }
        );
        res.json(productDoc);
    } else if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findById({ _id: req.query.id }));
        } else {
            res.json(await Product.find());
        }
    } else if (method === "DELETE") {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
        }
        res.json(true);
    }
};

export default isAdmin(handler);
