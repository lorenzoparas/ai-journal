import { createContext } from "react";
import { JournalContextType } from "../types/journal";
import { Service } from "../types/service";

export const JournalContext = createContext<JournalContextType>({
    journal: '',
    setJournal: () => {},
    currService: Service.TC,
    setCurrService: () => {},
    isLoading: false,
    setIsLoading: () => {},
    serviceOutput: { thinkingPatterns: [] },
    setServiceOutput: () => {},
    inputHistory: [],
    setInputHistory: () => {}
});
