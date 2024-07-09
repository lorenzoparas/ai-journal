import { createContext } from "react";
import { ModalContextType } from "../types/modal";

export const ModalContext = createContext<ModalContextType>({
    openModal: null,
    setOpenModal: () => {}
});
