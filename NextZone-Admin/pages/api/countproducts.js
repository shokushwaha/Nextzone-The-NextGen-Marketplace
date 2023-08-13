import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./isAdmin";
import { Product } from "@/models/Product";

const handler = async (req, res) => {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        const result = await Product.countDocuments({});
        res.json(result);
    }
}
export default isAdmin(handler);