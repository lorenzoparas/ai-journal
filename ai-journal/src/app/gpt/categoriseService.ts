import { CATEGORISE_AND_EXPLAIN_PROMPTS, EXPLANATIONS, THINKING_PATTERNS } from "../consts/service";
import openai from "../openai";
import { Service } from "../types/service";

const categoriseService = async (quotes: string[], service: Service) => {
    if (quotes.length === 0) return { thinkingPatterns: [] }; 

    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: CATEGORISE_AND_EXPLAIN_PROMPTS[service] },
            { role: "user", content: String(quotes) },
        ],
        model: 'gpt-3.5-turbo',
        tools: [{
            "type": "function",
            "function": {
                "name": "identify_cognitive_distortions",
                "description": "Identifies all cognitive distortion present in a journal entry.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "thinkingPatterns": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "quote": {
                                        "type": "string",
                                        "description": "A direct quote from the journal entry that most represents this thinking pattern"
                                    },
                                    "thinkingPattern": {
                                        "type": "string",
                                        "enum": THINKING_PATTERNS[service]
                                    },
                                    "explanation": {
                                        "type": "string",
                                        "description": EXPLANATIONS[service]
                                    },
                                },
                                "required": ["quote", "thinkingPattern", "explanation"]
                            }
                        }
                    },
                    "required": ["thinkingPatterns"]
                },
            },
        }],
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (!toolCalls) return { thinkingPatterns: [] };

    return JSON.parse(toolCalls[0].function.arguments)
};

export default categoriseService;