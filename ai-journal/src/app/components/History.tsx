import { Card, Select, Option, Spinner, Alert, Button } from "@material-tailwind/react";
import { JournalContext } from "../context/journal";
import { JournalContextType } from "../types/journal";
import { useContext } from "react";
import ServiceSelect from "./ServiceSelect";
import { v4 as uuidv4 } from 'uuid';
import { Role } from "../types/history";
import { ModalContextType, Modals } from "../types/modal";
import { ModalContext } from "../context/modal";
import { ApiKeyContextType } from "../types/api-key";
import { ApiKeyContext } from "../context/api-key";

const SystemMessage = ({ message, key }: { message: string, key?: string }) => {
    return (
        <div key={key} className="my-4">
            {message}
        </div>
    );
}

const UserMessage = ({ message, key }: { message: string, key?: string }) => {
    return (
        <div key={key} className="my-4">
            {message}
        </div>
    );
}

const History = () => {
    const { inputHistory } = useContext<JournalContextType>(JournalContext);
    const { setOpenModal } = useContext<ModalContextType>(ModalContext);
    const { apiKey } = useContext<ApiKeyContextType>(ApiKeyContext);

    return (
        <>
            <Card className="h-full p-4 w-2/5 shadow-blue-gray-900/5 flex">
                <div className="relative h-full">
                    <div className="w-full">
                        <div className="mt-4">
                            <ServiceSelect />
                        </div>
                    </div>
                </div>
                {apiKey.length === 0 && <Alert color="amber">
                    <div className="flex justify-center items-center">
                        <div className="text-center">
                            Your OpenAI API key isn&apos;t configured.
                        </div>
                        <div className="ml-8">
                            <Button onClick={() => setOpenModal(Modals.API_KEY)}>Set up key</Button>
                        </div>
                    </div>
                </Alert>}
                {
                    inputHistory.map(historyEntry => {
                        return (
                            historyEntry.role === Role.SYSTEM
                                ? <SystemMessage key={uuidv4()} message={historyEntry.message} />
                                : <UserMessage key={uuidv4()} message={historyEntry.message} />
                        );
                    })
                }
            </Card>
        </>
    );
};

export default History;
