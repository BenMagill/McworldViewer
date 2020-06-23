import React, {useContext} from 'react'
import Link from "react-router-dom/Link"
import {DataContext} from "../../store/DataStore"
import "./index.css"

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;



export default function Index() {

    const data = useContext(DataContext)

    ipcRenderer.on("recieved-dir", (e, out) => {
        // console.log(out)
        // console.log(out.filePaths[0].split("/"))

        if(out.canceled === false) {
            data.setWorldFolder(out.filePaths[0])
            
            // fs.readdir(path.join(out.filePaths[0], "playerdata"), (err, files) => {
            // files.forEach(file => {
            //     console.log(file);
            // });
            // });
        }
    })
    
      const handleClick = () => {
        ipcRenderer.send('select-folder')
      }

    return (
        <div className="navbar">
            <p className="navTitle">MC World Viewer</p>
            <div className="folderSelector">
                <button onClick={handleClick}>{data.worldFolder? "Selected: " + data.worldFolder.split("/")[data.worldFolder.split("/").length -1] : "Select Folder"}</button>
            </div>
            <div className="tabs">
                <Link className="tab" to="/illegals">
                    <button>
                        Illegals
                    </button>
                </Link>
                <Link className="tab" to="/player">
                    <button>
                        Player
                    </button>
                </Link>
                <Link className="tab" to="/world">
                    <button>
                        World
                    </button>
                </Link>
            </div>
        </div>
    )
}
