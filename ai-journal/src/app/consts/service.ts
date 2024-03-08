import { Service } from "../types/service"

export const CONTEXT_PROMPTS = {
    [Service.TC]: "You go through each sentence and extract every single example of a cognitive distortion in a journal entry, using direct quotes only.",
    [Service.PC]: "You go through each sentence and extract every narrow perspective that could benefit from alternative perspectives, such as new solutions or viewpoints in a journal entry, using direct quotes only.",
    [Service.DI]: "You go through each sentence and extract the two most Insightful Reflection Points in a journal entry, using direct quotes only. "
};

export const CATEGORISE_AND_EXPLAIN_PROMPTS = {
    [Service.TC]: "You categorise cognitive distortions and explain why they are an example of that cognitive distortion",
    [Service.PC]: "You categorise the narrow perspectives and explain why they are an example of that type.",
    [Service.DI]: "You categorise the insightful reflection points and explain why they are an example of that type."
}

export const THINKING_PATTERNS = {
    [Service.TC]: ["Black or white thinking", "Overgeneralisation", "Labelling", "Fortune telling", "Mind reading", "Blaming", "Catastrophising", "Discounting the positives", "Emotional reasoning"],
    [Service.PC]: ["Tunnel Vision", "Overemphasis on Negatives", "Limited Problem-Solving", "Rigid Thinking"],
    [Service.DI]: ["Reflective & Emotional Insight", "Forward-Thinking", "Behavioral Analysis", "Relationship Dynamics", "Value Exploration"]
}

export const EXPLANATIONS = {
    [Service.TC]: "Explain why this is an example of the thinking pattern and suggest a more helpful reframe.",
    [Service.PC]: "Explain why this is an example of a narrow perspective and suggest a broader viewpoint or alternative perspective.",
    [Service.DI]: "Explain the significance of this reflective trigger and suggest a highly personalised prompt for deeper exploration."
}
