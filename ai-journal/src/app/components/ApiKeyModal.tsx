import { useContext, useMemo, useState } from "react";
import { ModalContextType, Modals } from "../types/modal";
import { ModalContext } from "../context/modal";
import { Button, Dialog, DialogBody, DialogHeader, Textarea } from "@material-tailwind/react";
import { ApiKeyContextType } from "../types/api-key";
import { ApiKeyContext } from "../context/api-key";
import { isApiKeyValid } from "../gpt/isApiKeyValid";
import OpenAI from "openai";

const ApiKeyModal = () => {
    const { openModal, setOpenModal } = useContext<ModalContextType>(ModalContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalApiKey, setModalApiKey] = useState<string>('');
    const { setApiKey, setOpenai } = useContext<ApiKeyContextType>(ApiKeyContext);

    const onSet = async () => {
        const isValid = await isApiKeyValid(modalApiKey);
    
        if (!isValid) {
            setErrorMessage('Invalid OpenAI key.');
            return;
        }

        const newOpenai = new OpenAI({
            apiKey: modalApiKey,
            dangerouslyAllowBrowser: true
        });

        setErrorMessage('');
        setApiKey(modalApiKey);
        setOpenai(newOpenai);
        setOpenModal(null);
    };
    
    return (
        <Dialog open={openModal === Modals.API_KEY} handler={e => { setOpenModal(null) }}>
            <DialogHeader>Set an OpenAI Key</DialogHeader>
            <div className="m-8 text-center">
                <Textarea
                    className="min-h-1"
                    onChange={e => setModalApiKey(e.target.value)}
                    error={errorMessage.length > 0}
                    label={errorMessage}
                >
                    
                </Textarea>
                <Button onClick={onSet}>Set</Button>
            </div>
        </Dialog>
    );
};

export default ApiKeyModal;
