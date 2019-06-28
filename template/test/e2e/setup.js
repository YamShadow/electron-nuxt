const path = require('path');
const { BUILD_DIR } = require('../../.electron-nuxt/config');
const { productName } = require('../../builder-config');
const { name } = require('../../package');
const fs = require('fs');


const YELLOW = '\x1b[33m';
const END = '\x1b[0m';

let unpackedDir = '';
let executableName = '';
let extension = '';


let os = process.platform;
if (os === "darwin") {
    unpackedDir = 'mac';
    executableName = name;
} else if (os === "win32" || os === "win64") {
    unpackedDir = 'win-unpacked';
    executableName = productName;
    extension = '.exe';
} else if (os === "linux") {
    unpackedDir = 'linux-unpacked';
    executableName = name;
}

const applicationPath = path.join(BUILD_DIR, `${unpackedDir}/${executableName}${extension}`);

if (!fs.existsSync(applicationPath)) {
    throw new Error(`${YELLOW}[Spectron setup]: Application with path: '${applicationPath}' doesn't exist. 
        First build your app ('npm run build') or set proper path to unpacked binary.${END}`)
}

process.env.APPLICATION_PATH = applicationPath;
