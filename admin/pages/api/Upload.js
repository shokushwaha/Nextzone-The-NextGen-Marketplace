import multiparty from "multiparty";
import fs from "fs";
import { nanoid } from "nanoid";
import { isAdmin } from "./isAdmin";

const handler = async (req, res) => {
    if (req.method !== "POST") return res.json("Bad request");

    const form = new multiparty.Form();
    const uploadedFiles = [];

    await new Promise((resolve, reject) => {
        form.parse(req, (error, fileds, files) => {
            if (error) reject(error);

            for (const file of files.images) {
                let ext = file.originalFilename.split(".")[1];
                let newFileName = nanoid() + '.' + ext;
                fs.copyFile(file.path, `public/upload/products/${newFileName}`, () => {
                    uploadedFiles.push(newFileName);
                    if (uploadedFiles.length === files.images.length) {
                        resolve();
                    }
                });
            }
        });
    });

    if (uploadedFiles.length) {
        return res.json(uploadedFiles[0]);
    } else {
        return res.json("Something went wrong!");
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default isAdmin(handler);
