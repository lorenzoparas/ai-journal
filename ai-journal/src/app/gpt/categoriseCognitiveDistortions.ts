import openai from "../openai";

const categoriseCognitiveDistortions = async (quotes: string[]) => {
    if (quotes.length === 0) return { thinkingPatterns: [] }; 

    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You categorise cognitive distortions and explain why they are an example of that cognitive distortion"},
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
                                        "enum": ["Black or white thinking", "Overgeneralisation", "Labelling",
                                                    "Fortune telling", "Mind reading", "Blaming",
                                                    "Catastrophising",
                                                    "Discounting the positives", "Emotional reasoning"]
                                    },
                                    "explanation": {
                                        "type": "string",
                                        "description": "Explain why this is an example of the thinking pattern and suggest a more helpful reframe."
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

export default categoriseCognitiveDistortions;