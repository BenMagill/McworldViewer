import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../../store/DataStore';
import {Redirect} from "react-router-dom"
import path from "path"
import Renderer from "./renderer"
import "./index.css"
const util = require('util');
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;
const readdir = util.promisify(fs.readdir);


export default function Index() {
    const data = useContext(DataContext)
    const [players, setPlayers] = useState([])

    var enchantMax = {
        protection:4,
        fire_protection:4,
        feather_falling:4,
        blast_protection:4,
        projectile_protection:4,
        respiration:3,
        aqua_affinity:1,
        thorns:3,
        depth_strider:3,
        frost_walker:2,
        curse_of_binding:1,
        sharpness:5,
        smite:5,
        bane_of_arthropods:5,
        knockback:2,
        fire_aspect:2,
        looting:3,
        sweeping_edge:3,
        power:5,
        punch:2,
        flame:1,
        infinity:1,
        efficiency:5,
        silk_touch:1,
        fortune:3,
        luck_of_the_sea:3,
        lure:3,
        unbreaking:3,
        mending:1,
        curse_of_vanishing:1,
        channeling:1,
        impaling:5,
        loyalty:3,
        riptide:3,
        multishot:1,
        piercing:4,
        quick_charge:3
    }

    useEffect(() => {
        async function g() {
            if (data.worldFolder !== "") {
                const playerList = []
                const files = await readdir(path.join(data.worldFolder, "playerdata"))
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    // console.log(file)
                    if (file.endsWith(".dat")) {
                        const uuid = file.replace(".dat", "")
                        // console.log(uuid)
                        const res = await ipcRenderer.invoke("convert-user-id", uuid)
                        const userData = JSON.parse(res)
                        if (userData.code === "player.found") {
                            // console.log(userData.data)
                            var parsedNbt = await ipcRenderer.invoke("parse-file", path.join(data.worldFolder, "playerdata", userData.data.player.id+".dat"))                        }
                            playerList.push({username: userData.data.player.username, uuid: userData.data.player.id, logo: userData.data.player.avatar, data: parsedNbt})
                        
                    } else {
                        console.log("No Players")
                    }
                }
            
                // console.log(playerList)
                setPlayers(playerList)
            }  else {
                console.log("No folder selected!")
            }
        }

        g()
    }, [data.worldFolder])

    const checkItems = (arr) => {
        var illegals = []
        if (arr !== undefined) {
            arr.map(item => {
                if (item.tag !== undefined) {
                    if (item.tag.value.Enchantments !== undefined) {
                        var currItem = []
                        var found = false
                        item.tag.value.Enchantments.value.value.map(enchantment => {
                            const currLvl = enchantment.lvl.value
                            const maxLvl = (enchantMax[enchantment.id.value.replace("minecraft:", "")])
                            if (currLvl > maxLvl) {
                                currItem.push({type: enchantment.id.value, lvl: enchantment.lvl.value})
                                found = true
                            }
                        });
                        if (found) {
                            illegals.push({name:item.id.value, enchants: currItem})
                        }
                    } 
                    if (item.tag.value.BlockEntityTag !== undefined && item.id.value.includes("shulker")) {
                        const shulkerItems = item.tag.value.BlockEntityTag.value.Items.value.value
                        const shulkerIllegals = checkItems(shulkerItems)
                        if (shulkerIllegals.length>0) {
                            shulkerIllegals.forEach(e => {
                                illegals.push(e)
                            })
                        }
                    }
                }
            })
        }
        return illegals
    }

    return (
        <div style={{width: "fit-content", margin: "10px"}}>
            Illegal items
            {/* go through all people echest and inv and check enchantment */}
            {players.map(player => {
                // console.log(player)
                return (
                    <div>
                        <p className="illegalItemsPlayer">{player.username}</p>
                        <Renderer data={checkItems(player.data.value.Inventory.value.value)} />
                        <Renderer data={checkItems(player.data.value.EnderItems.value.value)} />
                    </div>
                )
            })}
            {data.worldFolder === "" ? <Redirect to=""/>: null}
        </div>
    )
}
