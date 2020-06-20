import React, {useState, createContext} from 'react'

export const DataContext = createContext()

export function DataProvider(props) {

    const [currentUser, setCurrentUser] = useState("")
    const [worldFolder, setWorldFolder] = useState("")
    const [playerDataLoaded, setPlayerDataLoaded] = useState("")

    return (
        <DataContext.Provider
            value = {{
                currentUser, 
                setCurrentUser,
                worldFolder,
                setWorldFolder,
                playerDataLoaded,
                setPlayerDataLoaded
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}
