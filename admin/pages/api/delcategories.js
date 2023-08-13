import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./isAdmin";
import { Category } from "@/models/Category";


const handler = async (req, res) => {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        await Category.deleteMany({});
        res.json('ok');
    }
}
export default isAdmin(handler);