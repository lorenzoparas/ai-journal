import OpenAI from "openai";

export type ApiKeyContextType = {
    apiKey: string;
    setApiKey: Function;
    openai: OpenAI | null;
    setOpenai: Function;
};
