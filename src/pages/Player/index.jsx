import React, {useContext, useEffect, useState} from 'react'
import path from "path"
import {DataContext} from "../../store/DataStore"
import Redirect from "react-router-dom/Redirect"
import nbt from "nbt"
import Viewer from "./viewer.jsx"
import "./index.css"
const util = require('util');
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;
const readdir = util.promisify(fs.readdir);

export default function Index() {
    const data = useContext(DataContext)
    const [players, setPlayers] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState("")
    const [parsedNbtData, setParsedNbtData] = useState({})

    useEffect(() => {
        async function g() {
            if (data.worldFolder !== "") {
                const playerList = []
                const files = await readdir(path.join(data.worldFolder, "playerdata"))
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    console.log(file)
                    if (file.endsWith(".dat")) {
                        const uuid = file.replace(".dat", "")
                        const res = await ipcRenderer.invoke("convert-user-id", uuid)
                        const userData = JSON.parse(res)
                        if (userData.code === "player.found") {
                            console.log(userData.data)
                            playerList.push({username: userData.data.player.username, uuid: userData.data.player.id, logo: userData.data.player.avatar})
                        }
                        
                    } else {
                        console.log("No Players")
                    }
                }
            
                console.log(playerList)
                setPlayers(playerList)
            }  else {
                console.log("No folder selected!")
            }
        }

        g()

    }, [data.worldFolder])

    useEffect(() => {
        parsePlayerData()

    }, [currentPlayer])
 
    const handlePlayerSelect = (e) => {
        setCurrentPlayer(e)
    }

    const parsePlayerData = () => {

        async function parse() {
            if (currentPlayer!== "") {

                // const parsedNbt = await ipcRenderer.invoke("parse-file", path.join(data.worldFolder, "playerdata", currentPlayer+".dat"))
                ipcRenderer.invoke("parse-file", path.join(data.worldFolder, "playerdata", currentPlayer+".dat")).then(parsedNbt => {
                    setParsedNbtData(parsedNbt)

                })
                // console.log(parsedNbt)
            }
        }
        parse()
    }
    
    return (
        <div className="player">
            <div className="playerSelector">
                <p>Players:</p>
                {
                    players.map(e => {
                        return (
                            <button className="playerContainer" key={e.uuid} onClick={handlePlayerSelect.bind(this, e.uuid)}>
                                <img src={e.logo} alt="Logo" className="playerAvatar" />
                                <p className="playerName">{e.username}</p>
                            </button>
                        )
                    })
                }
                
            </div>
            <div className="playerContent">
                {currentPlayer===""  ? <p>Select a player</p> : <Viewer data={parsedNbtData}/> }
                {currentPlayer}
                {/* {setParsedNbtData.value.Pos.value.value[0]} */}
            </div>
            {data.worldFolder === "" ? <Redirect to=""/>: null}
        </div>
    )
}
