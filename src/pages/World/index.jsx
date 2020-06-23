import React, {useContext} from 'react'
import {Redirect} from "react-router-dom"
import { DataContext } from '../../store/DataStore'


export default function Index() {
    const data = useContext(DataContext)
    return (
        <div>
            Coming soon!
            {data.worldFolder === "" ? <Redirect to=""/>: null}
        </div>
    )
}
