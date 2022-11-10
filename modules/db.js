const fs = require('fs');
class DB {
    constructor() {
        fs.writeFileSync('messages/db.json', '[]');
    }
    get() {
        return JSON.parse(fs.readFileSync('messages/db.json'));
    }
    add(id, message) {
        let data = {
            id: id,
            message: message,
            time: new Date().getTime()
        };

        console.table(data);
        let olddata = this.get();
        olddata.push(data);
        fs.writeFileSync('messages/db.json', JSON.stringify(olddata, null, 2));
    }
}

module.exports = DB;