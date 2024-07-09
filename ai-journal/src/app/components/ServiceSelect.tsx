import { Select, Option, Spinner } from "@material-tailwind/react";
import { Service } from "../types/service";
import { useContext } from "react";
import { JournalContext } from "../context/journal";
import categoriseCognitiveDistortions from "../gpt/categoriseCognitiveDistortions";
import identifyCognitiveDistortions from "../gpt/identifyCognitiveDistortions";
import { JournalContextType } from "../types/journal";
import { Role } from "../types/history";
import identifyService from "../gpt/identifyService";
import categoriseService from "../gpt/categoriseService";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ApiKeyContextType } from "../types/api-key";
import { ApiKeyContext } from "../context/api-key";

const ServiceSelect = () => {
    const {
        journal,
        isLoading,
        setIsLoading,
        setServiceOutput,
        inputHistory,
        setInputHistory
    } = useContext<JournalContextType>(JournalContext);

    const { openai, apiKey } = useContext<ApiKeyContextType>(ApiKeyContext);

    const processService = (service: Service) => {
        if (journal.length === 0) return;
        if (service === Service.TC) onTC(journal);
        if (service === Service.PC) onPC(journal);
        if (service === Service.DI) onDI(journal);
    };

    const onTC = async (journal: string) => {
        if (!openai) return;

        let newInputHistory = [...inputHistory, { role: Role.USER, message: 'Scan for cognitive biases.' }];
        setInputHistory(newInputHistory);

        setIsLoading(true);

        const cognitiveDistortions = await identifyCognitiveDistortions(journal, openai);
        const quotes = cognitiveDistortions.quotes;

        if (quotes.length === 0) return;
        const categorisedCognitiveDistortions = await categoriseCognitiveDistortions(quotes, openai);

        setIsLoading(false);

        newInputHistory = [...newInputHistory, { role: Role.SYSTEM, message: 'Here are some cognitive biases we identified.' }];
        setInputHistory(newInputHistory);

        setServiceOutput(categorisedCognitiveDistortions);
    };

    const onPC = async (journal: string) => {
        if (!openai) return;

        let newInputHistory = [...inputHistory, { role: Role.USER, message: 'Offer a different perspective.' }];
        setInputHistory(newInputHistory);

        setIsLoading(true);

        const identifyOutput = await identifyService(journal, Service.PC, openai);
        const quotes = identifyOutput.quotes;

        if (quotes.length === 0) return;
        const categorisedOutput = await categoriseService(quotes, Service.PC, openai);

        setIsLoading(false);

        newInputHistory = [...newInputHistory, { role: Role.SYSTEM, message: 'Here are some different perspectives.' }];
        setInputHistory(newInputHistory);

        setServiceOutput(categorisedOutput);
    };

    const onDI = async (journal: string) => {
        if (!openai) return;

        let newInputHistory = [...inputHistory, { role: Role.USER, message: 'Suggest prompts for deeper insights.' }];
        setInputHistory(newInputHistory);

        setIsLoading(true);

        const identifyOutput = await identifyService(journal, Service.DI, openai);
        const quotes = identifyOutput.quotes;

        if (quotes.length === 0) return;
        const categorisedOutput = await categoriseService(quotes, Service.DI, openai);

        setIsLoading(false);

        newInputHistory = [...newInputHistory, { role: Role.SYSTEM, message: 'Here are some prompts for deeper insights.' }];
        setInputHistory(newInputHistory);

        setServiceOutput(categorisedOutput);
    };

    return (
        <Select
            label={"AI Powered Analysis"}
            disabled={isLoading || journal.length === 0 || apiKey.length === 0}
            onChange={val => processService(val as Service)}
            arrow={isLoading ? <Spinner /> : <SparklesIcon />}
        >
            <Option value={Service.TC}>Scan for cognitive biases</Option>
            <Option value={Service.PC}>Offer a different perspective</Option>
            <Option value={Service.DI}>Suggest prompts for deeper insights</Option>
        </Select>
    );
};

export default ServiceSelect;
