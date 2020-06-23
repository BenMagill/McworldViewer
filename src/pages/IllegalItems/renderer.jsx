import React from 'react'

export default function renderer(props) {
    const itemList = props.data
    return (
        <React.Fragment>
            {itemList.map(item => {
                return (
                    <div className="illegalItemContainer">
                        <p className="illegalItemTitle">{item.name.replace("minecraft:", "")}</p>
                        {item.enchants.map(illegalEnchants => {
                            return <p>{illegalEnchants.type + " " + illegalEnchants.lvl}</p>
                        })}
                    </div>
                )                
            })}

        </React.Fragment>
    )
}
