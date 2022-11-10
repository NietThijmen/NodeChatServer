const fs = require('fs');

const GetTime = () => {
    let d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

/**
 * A logging resource which logs to a file.
 */
class log {
    constructor() {
        if (!fs.existsSync('./log.txt')) {
            fs.writeFileSync('./log.txt', '');
        }
    }
    add(message) {
        fs.appendFileSync('./log.txt', `[${GetTime()}] - ${message}\n`);

    }
    get() {
        return fs.readFileSync('./log.txt', 'utf8').split('\n');
    }

    clear() {
        fs.writeFileSync('./log.txt', '');
    }
    
}

module.exports = log;