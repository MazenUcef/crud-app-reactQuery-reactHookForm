import { createContext } from 'react'


export const GlobalContext = createContext(null)



export const GlobalState = ({ children }) => {
    return <GlobalContext.Provider>{children}</GlobalContext.Provider>
}