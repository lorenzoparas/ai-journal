import { createContext } from "react";
import { JournalContextType } from "../types/journal";
import { Service } from "../types/service";
import { ApiKeyContextType } from "../types/api-key";

export const ApiKeyContext = createContext<ApiKeyContextType>({
    apiKey: '',
    setApiKey: () => {},
    openai: null,
    setOpenai: () => {}
});
