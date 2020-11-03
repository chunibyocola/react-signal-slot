import { useEffect, useRef } from 'react';

const signals: Map<string, Array<Function>> = new Map();

const subscribeSignals = (type: string, handler: Function) => {
    const handlers = signals.get(type);

    handlers ? handlers.push(handler) : signals.set(type, [handler]);
};

const unsubscribeSignals = (type: string, handler: Function) => {
    const handlers = signals.get(type);

    handlers && handlers.splice(handlers.indexOf(handler) >>> 0, 1);
};

export const useSlot = (type: string, handler: Function) => {
    useEffect(() => {
        subscribeSignals(type, handler);

        return () => unsubscribeSignals(type, handler);
    }, [type, handler]);
};

export const useSignal = () => {
    const signalRef = useRef((type: string, ...args: any[]) => {
        const handlers = signals.get(type);

        handlers && handlers.map((handler) => { handler(...args); });
    });

    return signalRef.current;
};