import React, {useState} from 'react'
import itemData from "../../minecraftItemData"

export default function LoadImage(props) {
    const e = props.data
    const [modalOpen, setModalOpen] = useState(false)
    // console.log(e)
    if (e == undefined) {
        return <div className="blankImage"></div>
    } else {
        var isShulker = false
        var isEnchanted = false
        if (e.tag != undefined) {
            if (e.tag.value.Enchantments != undefined) {
                isEnchanted = true
            }
            if (e.tag.value.BlockEntityTag != undefined && e.id.value.includes("shulker")) {
                isShulker = true
            }
        }
        // console.log({isShulker, isEnchanted})


        var shulker = {}
        var sTopRow = []
        var sMidRow = []
        var sBotRow = []
        if (isShulker) {
            const shulkCont = e.tag.value.BlockEntityTag.value.Items.value.value
            console.log("shulker!")
            console.log()
            if (shulkCont.length === 0) {
                console.log("Empty Inv")
            } else {
                shulkCont.forEach(element => {
                    shulker[element.Slot.value] = element
                });
            }
            for (let i = 0; i < 9; i++) {
                sTopRow.push(shulker[i])
            }
            for (let i = 0; i < 9; i++) {
                sMidRow.push(shulker[9+i])
            }
            for (let i = 0; i < 9; i++) {
                sBotRow.push(shulker[18+i])
            }
        }
        const handleShulkerClose = (ev) => {
            ev.persist()
            console.log(ev)
            if (ev.target.className.includes("shulkerModal") || ev.target.className === "close") {
                console.log("CLICK")
                setModalOpen(false)
                // console.log(e.tag.value.BlockEntityTag.value.Items.value)

            }
        }

        const handleShulkerOpen = () => {
            if (isShulker) {
                setModalOpen(true)
            }
        }

        return (
            <React.Fragment>
            <div className={"itemContainer " + (isEnchanted?"enchanted":null) } onClick={handleShulkerOpen}>
                <img alt=";)" src={ "/images/" + (itemData[e.id.value] != undefined? itemData[e.id.value].type : "166") + "-0.png"}/>
                <span className="itemTooltip">
                    <p className="itemNickname">{e.tag ? e.tag.value.display ? JSON.parse(e.tag.value.display.value.Name.value).text : null : null}</p>

                    <p>{e.id.value}</p>

                    {e.tag ? e.tag.value.Enchantments ? e.tag.value.Enchantments.value.value.map(enchants => {
                        return <p>{enchants.id.value + " " + enchants.lvl.value}</p>
                    }) : null : null}

                    {e.tag ? e.tag.value.StoredEnchantments ? e.tag.value.StoredEnchantments.value.value.map(enchants => {
                        return <p>{enchants.id.value + " " + enchants.lvl.value}</p>
                    }) : null : null}
                </span>
            </div>
            <div className={"shulkerModal " + (modalOpen ? "shulkerModalOpen" : "")} onClick={handleShulkerClose}>
                <div className="modalContent">
                    <span class="close" onClick={handleShulkerClose}>&times;</span>
                    <p>Shulker Items: </p>

                    <div className="invRow">
                    {sTopRow.map(e => {
                            if (e === undefined) {
                            return <LoadImage />
                        } else {
                            return <LoadImage data={e} />
                        }
                    })}
                    </div>
                    <div className="invRow">
                    {sMidRow.map(e => {
                            if (e === undefined) {
                            return <LoadImage />
                        } else {
                            return <LoadImage data={e} />
                        }
                    })}
                    </div>
                    <div className="invRow">
                    {sBotRow.map(e => {
                            if (e === undefined) {
                            return <LoadImage />
                        } else {
                            return <LoadImage data={e} />
                        }
                    })}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )    

    }
}
