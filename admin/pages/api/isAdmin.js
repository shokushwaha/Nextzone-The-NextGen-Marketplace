import { getServerSession } from "next-auth";
import { authOptions } from './auth/[...nextauth]';

export const isAdmin = (handler) => async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session?.user?.isAdmin === false) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    return handler(req, res);
};