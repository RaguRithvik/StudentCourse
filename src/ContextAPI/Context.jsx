import React from 'react'
import { createContext, useState } from "react";
const CounterContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState({ name: "", password: "", isLogged: false });
    return (
        <CounterContext.Provider value={{ user, setUser }}>
            {props.children}
        </CounterContext.Provider>
    )
}
export default CounterContext;