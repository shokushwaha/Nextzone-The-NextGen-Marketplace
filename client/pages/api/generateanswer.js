// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "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"
})
const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === 'POST') {

        const { prompt } = req.body;


        const aiResult = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 2048,
            frequency_penalty: 0.5,
            presence_penalty: 0

        })

        const response = aiResult.data.choices[0].text?.trim() || "Sorry some problem occured";
        res.json(response);
    }

}


