import { mongooseConnect } from "@/lib/mongoose";
import { isAdmin } from "./isAdmin";
import { Admin } from "@/models/Admin";

const handler = async (req, res) => {
    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { email } =
            req.body;

        const adminDoc = await Admin.create({
            email
        });
        res.json(adminDoc);
    }
    else if (method === "GET") {

        res.json(await Admin.find({}));

    }
};

export default isAdmin(handler);
