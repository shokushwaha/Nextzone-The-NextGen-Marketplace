import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Orders";
import { isAdmin } from "./isAdmin"
const handler = async (req, res) => {
    await mongooseConnect();
    const { method } = req;
    if (method === "GET") {
        res.json(await Order.find());
    }
}

export default isAdmin(handler);