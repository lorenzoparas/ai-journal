
export enum Service {
    TC = 'thought-checker',
    PC = 'perspective-checker',
    DI = 'deeper-insights',
};

export type ServiceOutput = {
    thinkingPatterns: ThinkingPattern[];
}

type ThinkingPattern = {
    quote: string;
    thinkingPattern: string;
    explanation: string;
}