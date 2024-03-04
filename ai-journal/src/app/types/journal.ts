import { InputHistoryItem } from "./history";
import { Service, ServiceOutput } from "./service";

export type JournalContextType = {
    journal: string;
    setJournal: Function;
    currService: Service;
    setCurrService: Function;
    isLoading: boolean;
    setIsLoading: Function;
    serviceOutput: ServiceOutput;
    setServiceOutput: Function;
    inputHistory: InputHistoryItem[];
    setInputHistory: Function;
};