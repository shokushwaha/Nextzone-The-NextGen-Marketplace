import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./isAdmin";
import { Product } from "@/models/Product";


const handler = async (req, res) => {
    const { method } = req;
    await mongooseConnect();


    if (method === "GET") {
        await Product.deleteMany({});
        res.json('ok');
    }
}
export default isAdmin(handler);