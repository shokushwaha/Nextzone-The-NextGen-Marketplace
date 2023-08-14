import React, { useState } from 'react';
import axios from 'axios';
const Chatbot = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const callOpenAI = async () => {
        const apiKey = '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';
        const prompt = `Question: ${question}\nAnswer:`;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: prompt,
                    max_tokens: 100,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            setAnswer(response.data.choices[0].text.trim());
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    };
    return (
        <>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
            />
            <button onClick={callOpenAI}>Get Answer</button>
            <div>Answer: {answer}</div>

        </>
    )
}

export default Chatbot