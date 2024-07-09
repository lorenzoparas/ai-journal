import { Dialog, DialogHeader, DialogBody, Typography, Button } from "@material-tailwind/react";
import { ModalContextType, Modals } from "../types/modal";
import { ModalContext } from "../context/modal";
import { useContext } from "react";

const GetStartedModal = () => {
    const { openModal, setOpenModal } = useContext<ModalContextType>(ModalContext);

    const onClickHere = () => {
        setOpenModal(Modals.API_KEY);
    }

    return (
        <Dialog open={openModal === Modals.GET_STARTED} handler={e => { setOpenModal(null) }}>
            <DialogHeader>Get Started</DialogHeader>
            <DialogBody>
                <Typography
                    variant="paragraph"
                    className="pb-3"
                >
                    Privacy is our top priority and anything you write is visible only to you - all data is lost on refresh.
                </Typography>
                <Typography
                    variant="paragraph"
                    className="py-3 font-black"
                >
                    How to use Prompt:
                </Typography>
                <Typography
                    variant="paragraph"
                    className="pb-2"
                >
                    1. <a href="https://platform.openai.com/signup">Register for an OpenAI account</a> and <a href="https://platform.openai.com/account/api-keys">create a new secret key</a>
                </Typography>
                <Typography
                    variant="paragraph"
                    className="pb-2"
                >
                    2. Paste and set your key <span onClick={() => setOpenModal(Modals.API_KEY)}>here.</span>
                </Typography>
                <Typography
                    variant="paragraph"
                    className="pb-2"
                >
                    3. Add a journal entry to the middle section.
                </Typography>
                <Typography
                    variant="paragraph"
                    className="pb-2"
                >
                    4. Once you&apos;ve finished journaling, select an AI power analysis on the right section.
                </Typography>
                <Typography
                    variant="paragraph"
                    className="pb-2"
                >
                    5. Hover over highlights to see the outputs.
                </Typography>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => setOpenModal(null)}
                    className="p-2 my-2"
                >
                    <span>Close</span>
                </Button>
            </DialogBody>
        </Dialog>
    )
};

export default GetStartedModal;
