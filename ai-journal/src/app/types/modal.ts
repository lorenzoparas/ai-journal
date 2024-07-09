export type ModalContextType = {
    openModal: Modals | null;
    setOpenModal: Function;
};

export enum Modals {
    GET_STARTED = 'get-started',
    API_KEY = 'api-key'
}