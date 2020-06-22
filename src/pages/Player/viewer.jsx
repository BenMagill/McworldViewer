import React from 'react'
import LoadImage from "../../components/ItemHandler"
export default function viewer(props) {
    const data = props.data
    if (props.data.value == undefined) {
        return (
            ""
        )
    } else {
        var mode;
        switch (data.value.playerGameType.value) {
            case 0:
                mode = "Survival"
                break
            case 1:
                mode = "Creative"
                break
            case 2: 
                mode = "Adventure"
                break
            case 3: 
                mode = "Spectator"
                break
            default:
                mode = "Error"
                break
        }

        const inv = data.value.Inventory.value.value
        var playerInventory = {}

        if (inv.length === 0) {
            // console.log("Empty Inv")
        } else {
            inv.forEach(element => {
               playerInventory[element.Slot.value] = element
            });
        }

        var topRow = []
        for (let i = 0; i < 9; i++) {
            const element = playerInventory[9+i];
            topRow.push(element)
        }
        var midRow = []
        for (let i = 0; i < 9; i++) {
            const element = playerInventory[18+i];
            midRow.push(element)
        }
        var botRow = []
        for (let i = 0; i < 9; i++) {
            const element = playerInventory[27+i];
            botRow.push(element)
        }
        var hotRow = []
        for (let i = 0; i < 9; i++) {
            const element = playerInventory[i];
            hotRow.push(element)
        }
        // console.log({topRow, midRow, botRow, hotRow})
        // console.log(playerInventory)

        /**
         * Helmet : 103
         * Chest : 102
         * Leg : 101
         * Boot : 100
         * off hand : -106 ?
         * Main inv : 9 in top left to 35 at bottom right. 3 rows of 9
         * Hotbar : 0 -> 8 ltr
        */        


        const ech = data.value.EnderItems.value.value
        var playerEchest = {}

        if (ech.length === 0) {
            // console.log("Empty Inv")
        } else {
            ech.forEach(element => {
                playerEchest[element.Slot.value] = element
            });
        }

        var eTopRow = []
        for (let i = 0; i < 9; i++) {
            eTopRow.push(playerEchest[i])
        }
        var eMidRow = []
        for (let i = 0; i < 9; i++) {
            eMidRow.push(playerEchest[9+i])
        }
        var eBotRow = []
        for (let i = 0; i < 9; i++) {
            eBotRow.push(playerEchest[18+i])
        }

        console.log({playerEchest})
        
        return (
            <div>
                {/* {console.log(data)} */}
                
                <p>{`Gamemode: ${mode}`}</p>

                <div className="viewerPos">
                    <p>Position:</p>
                    <p>X: {Math.trunc(data.value.Pos.value.value[0])}</p>
                    <p>Y: {Math.trunc(data.value.Pos.value.value[1])}</p>
                    <p>Z: {Math.trunc(data.value.Pos.value.value[2])}</p>
                </div>

                <p>{`Score: ${data.value.XpTotal.value}`}</p>

                <p>{`Xp Level: ${data.value.XpLevel.value}`}</p>

                <p>{`Xp Seed: ${data.value.XpSeed.value}`}</p>

                <p>{`Seen Credits: ${(data.value.seenCredits.value == 1 ? "True" : "False")}`}</p>

                <p>{`Can Fly: ${(data.value.abilities.value.mayfly.value == 1 ? "True" : "False")}`}</p>

                <p>{`Can Build: ${data.value.abilities.value.mayBuild.value == 1 ? "True" : "False"}`}</p>

                <p>{`Can Build: ${data.value.abilities.value.invulnerable.value == 1 ? "True" : "False"}`}</p>

                <div>
                    <div className="inventory">
                        <p className="invText">Inventory</p>
                        <div className="armour">
                            <div className="armourSlot">
                                {playerInventory[103] != undefined ? <LoadImage data={playerInventory[103]} /> : <LoadImage data={{id:{value:"empty_armor_slot_helmet"}}}/>}
                            </div>
                            <div className="armourSlot">
                                {playerInventory[102] != undefined ? <LoadImage data={playerInventory[102]} /> : <LoadImage data={{id:{value:"empty_armor_slot_chestplate"}}}/>}
                            </div>
                            <div className="armourSlot">
                                {playerInventory[101] != undefined ? <LoadImage data={playerInventory[101]} /> : <LoadImage data={{id:{value:"empty_armor_slot_leggings"}}}/>}
                            </div>
                            <div className="armourSlot">
                                {playerInventory[100] != undefined ? <LoadImage data={playerInventory[100]} /> : <LoadImage data={{id:{value:"empty_armor_slot_boots"}}}/>}
                                {playerInventory[-106] != undefined ? <LoadImage data={playerInventory[-106]} /> : <LoadImage data={{id:{value:"empty_armor_slot_shield"}}}/>}
                            </div>
                        </div>
                        <div className="invRow">
                            {topRow.map(e => {
                                if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                        <div className="invRow">
                            {midRow.map(e => {
                                if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                        <div className="invRow">
                            {botRow.map(e => {
                                if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                        <div className="hotbar">
                            {hotRow.map(e => {
                                if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="inventory">
                        <p className="invText">Ender chest</p>
                        <div className="invRow">
                            {eTopRow.map(e => {
                                    if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                        <div className="invRow">
                            {eMidRow.map(e => {
                                    if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                        <div className="invRow">
                            {eBotRow.map(e => {
                                    if (e === undefined) {
                                    return <LoadImage />
                                } else {
                                    return <LoadImage data={e} />
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
