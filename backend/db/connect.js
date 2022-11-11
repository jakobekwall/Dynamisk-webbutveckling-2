//server side code here

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

const client = new MongoClient("mongodb+srv://JakobEkwall:Mongo@cluster0.km1koxv.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("Hamstersh");
                console.log("Run Forest run")
            }
            return callback(err);
        })
    },

    getDb: function () {
        return _db;
    }
}