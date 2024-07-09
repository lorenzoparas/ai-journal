import OpenAI from "openai";


export const isApiKeyValid = async (apiKey: string): Promise<boolean> => {
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    try {   
        await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "." }]
        });
    } catch {
        return false;
    }
    return true;
};
