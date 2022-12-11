import { createContext, useState } from "react";
export const Context = createContext({} as { project: { [key: string]: any }, setProject: (value: {}) => void });
export const ContextProvider = ({ children }: { children: any }) => {
    const [ project, setProject ] = useState({});

    return (
        <Context.Provider value={{ project, setProject }}>
            { children }
        </Context.Provider>
    );
}