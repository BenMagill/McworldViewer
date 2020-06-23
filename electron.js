const electron = require("electron")
const os = require('os');
const {BrowserWindow, app, ipcMain, dialog, net, Menu} = require("electron")
const path = require("path")
const url = require("url")
const fs = require("fs")
const nbt = require("nbt")

let mainWindow
function createWindow(){
    mainWindow = new BrowserWindow({width: 1020, height: 600, minWidth: 1020,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            webSecurity: false
        }
    })

    const appUrl = process.env.ELECTRON_URL || url.format({
        pathname: path.join(__dirname, "/build/index.html"),
        protocol: "file:",
        slashes: true
    })
    mainWindow.loadURL(appUrl)

    mainWindow.on("closed", function(){
        mainWindow = null
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate([]))
}

app.on("ready", createWindow)

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})

app.on("activate", function () {
    if (mainWindow === null) createWindow()
})



ipcMain.on('select-folder', async (event, arg) => {
    const currUser = os.userInfo().username
    var minecraftPath;
    if (process.platform === "win32") minecraftPath = `C:/Users/${currUser}/AppData/Roaming/.minecraft/saves` 
    else if (process.platform === "darwin") minecraftPath = `/Users/${currUser}/Library/Application Support/minecraft/saves` 
    else if (process.platform === "linux") minecraftPath = `/home/${currUser}/.minecraft/saves`
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      defaultPath: minecraftPath,
      
    })
    console.log('directories selected', result.filePaths)
    event.reply("recieved-dir", result)

})

ipcMain.handle("convert-user-id", async (event, arg) => {
    console.log(arg)
    var out = await new Promise((res, rej) => {
        const request = net.request("https://playerdb.co/api/player/minecraft/"+arg)
        var data;
        request.on('response', (response) => {
        //   console.log(`STATUS: ${response.statusCode}`)
        //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
          response.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`)
            // event.reply("convert-user-id-out", `${chunk}`)
            data = `${chunk}`
          })
          response.on('end', () => {
            // console.log('No more data in response.')
            res(data)
          })
        })
        request.end()
    })
    console.log(out)
    return out
})

ipcMain.handle("parse-file", async (event, arg) => {
    var out = await new Promise((res, rej) => {
        var nbtFile = fs.readFileSync(arg);
        nbt.parse(nbtFile, (error, data) => {
            console.log(arg)
            res(data)
        })
        
    })
    return out
})