import { CONTEXT_PROMPTS } from "../consts/service";
import openai from "../openai";
import { Service } from "../types/service";

const identifyService = async (journal: string, service: Service) => {
    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: CONTEXT_PROMPTS[service] },
            { role: "user", content: journal },
        ],
        model: 'gpt-3.5-turbo',
        tools: [{
            "type": "function",
            "function": {
                "name": "identify_cognitive_distortions",
                "description": "Identifies all cognitive distortion present in a journal entry and complements journal entry provider.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "quotes": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "A direct quote from the journal entry that represents a cognitive distortion."
                            }
                        }
                    },
                    "required": ["quotes"]
                }
            },
        }],
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (!toolCalls) return { quotes: [] };

    return JSON.parse(toolCalls[0].function.arguments);
};

export default identifyService;
