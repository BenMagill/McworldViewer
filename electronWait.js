const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_URL = `http://localhost:${port}`;

const client = new net.Socket();

let electronStarted = false

const tryConnection = () => client.connect({port}, () => {
        client.end();
        if(!electronStarted) {
            console.log('electron starting');
            electronStarted = true;
            const exec = require('child_process').exec;
            exec('npm run electron')
            
        }
    }
);

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

tryConnection();
