import React, {useState} from 'react'

export default function LoadImage(props) {
    const e = props.data
    const [modalOpen, setModalOpen] = useState(false)
    // console.log(e)
    if (e == undefined) {
        return <div className="blankImage"></div>
    } else {
        var isShulker = false
        var isEnchanted = false
        var isEnchantedBook = false
        var isPotion = false
        if (e.tag != undefined) {
            if (e.tag.value.Enchantments != undefined) {
                isEnchanted = true
            }
            if (e.tag.value.BlockEntityTag != undefined && e.id.value.includes("shulker")) {
                isShulker = true
            }
            if (e.tag.value.Potion != undefined) {
                isPotion = true
            }
            if (e.tag.value.StoredEnchantments != undefined) {
                isEnchantedBook = true
            }
        }

        var shulker = {}
        var sTopRow = []
        var sMidRow = []
        var sBotRow = []
        if (isShulker) {
            const shulkCont = e.tag.value.BlockEntityTag.value.Items.value.value
            // console.log("shulker!")
            // console.log()
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
            <div className={"itemContainer " + (isEnchanted || isEnchantedBook ?"enchanted":"") } onClick={handleShulkerOpen}>
                {/* <img alt=";)" src={ "/images/" + (itemData[e.id.value] != undefined? itemData[e.id.value].type : "166") + "-0.png"}/> */}
                {/* {itemData[e.id.value] != undefined? "" : console.log(e.id.value)} */}
                {/* <img className="itemContainer" alt=";)" onError={(ev)=>{ev.target.onerror = null; ev.target.src="/images/new/barrier.png"}} src={ "/images/new/" + (e.id.value != undefined? e.id.value.replace("minecraft:", ""): "barrier") + ".png"}/> */}
                <img className="item" alt=";)" onError={(ev)=>{ev.target.onerror = null; ev.target.src="/images/all/barrier.png";}} src={ "/images/all/" + (e.id.value != undefined? e.id.value.replace("minecraft:", ""): "barrier") + ".png"}/>
                <p className="itemCount">{e.Count ? e.Count.value == 1 ? "": e.Count.value : ""}</p>
                <span className="itemTooltip">
                    <p className="itemNickname">{e.tag ? e.tag.value.display ? JSON.parse(e.tag.value.display.value.Name.value).text : null : null}</p>

                    <p>{e.id.value}</p>

                    <div className="itemTextExtra">

                    {e.tag ? e.tag.value.Enchantments ? e.tag.value.Enchantments.value.value.map(enchants => {
                        return <p>{enchants.id.value + " " + enchants.lvl.value}</p>
                    }) : null : null}

                    {e.tag ? e.tag.value.StoredEnchantments ? e.tag.value.StoredEnchantments.value.value.map(enchants => {
                        return <p>{enchants.id.value.replace("minecraft:","").replace(/_/g, " ") + " " + enchants.lvl.value}</p>
                    }) : null : null}

                    {isPotion ? <p>{e.tag.value.Potion.value}</p> : ""}

                    {isShulker ? <p>{e.tag.value.BlockEntityTag.value.Items.value.value.length + " slots used"}</p> : e.id.value.includes("shulker") ? <p>0 slots used</p> : ""}
                    
                    </div>
                </span>
            </div>
            <div className={"shulkerModal " + (modalOpen ? "shulkerModalOpen" : "")} onClick={handleShulkerClose}>
                <div className="modalContent">
                    <span class="close" onClick={handleShulkerClose}>&times;</span>
                    {/* <p>Shulker Items: </p> */}
                    <div className="inventory">
                        <p className="invText">Shulker Box</p>
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
            </div>
            </React.Fragment>
        )    

    }
}
