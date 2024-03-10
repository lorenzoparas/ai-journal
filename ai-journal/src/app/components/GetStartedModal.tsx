import { Dialog, DialogHeader, DialogBody, Typography, Button } from "@material-tailwind/react";
import { ModalContextType } from "../types/modal";
import { ModalContext } from "../context/modal";
import { useContext } from "react";

const GetStartedModal = () => {
    const { isModalOpen, setIsModalOpen } = useContext<ModalContextType>(ModalContext);

    return (
        <Dialog open={isModalOpen} handler={e => { setIsModalOpen(e) }}>
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
                    className="pb-3"
                >
                    1. Add a journal entry to the middle section.
                </Typography>
                <Typography
                    variant="paragraph"
                    className="py-3"
                >
                    2. Once you&apos;ve finished journaling, select an AI power analysis on the right section.
                </Typography>
                <Typography
                    variant="paragraph"
                    className="py-3"
                >
                    3. Hover over highlights to see the outputs.
                </Typography>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => setIsModalOpen(null)}
                    className="p-2 my-2"
                >
                    <span>Close</span>
                </Button>
            </DialogBody>
        </Dialog>
    )
};

export default GetStartedModal;
