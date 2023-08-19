import mongoose from "mongoose";

export function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    else {
        const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
        return mongoose.connect(uri);
    }
}