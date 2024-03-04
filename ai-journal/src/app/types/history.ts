
export enum Role {
    SYSTEM = 'system',
    USER = 'user'
};

export type InputHistoryItem = {
    message: string;
    role: Role
};
