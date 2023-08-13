import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./isAdmin";
import { Category } from "@/models/Category";


const handler = async (req, res) => {
    const { method } = req;
    await mongooseConnect();


    if (method === "GET") {
        const result = await Category.countDocuments({});
        res.json(result);
    }
}
export default isAdmin(handler);