import { Card, Select, Option, Spinner } from "@material-tailwind/react";
import { JournalContext } from "../context/journal";
import { JournalContextType } from "../types/journal";
import { useContext } from "react";
import ServiceSelect from "./ServiceSelect";
import { v4 as uuidv4 } from 'uuid';
import { Role } from "../types/history";

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
