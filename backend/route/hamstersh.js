const express = require("express");
const hamstershRoutes = express.Router();
//connect to db
const dbo = require("../db/connect");

//Detta hjälper att konvertera vårt id från en 
//sträng till ett objekt-id (_id)
const ObjectId = require("mongodb").ObjectId;

//här ska vi få en lista över våra records
hamstershRoutes.route("/getHamsters").get(async function (req, res) {
    let db_connect = dbo.getDb();

    db_connect.collection("Hamstersh")
        .find()
        .toArray(function (err, result) {
            if (err) res.status(400)
            res.json(result)
        })
});

hamstershRoutes.route("/createNewHamster").post(function (req, res) {
    let db_connect = dbo.getDb();
    let newHamster = {
        name: req.body.name,
        favFood: req.body.favFood,
        _id: ObjectId(),
        age: req.body.age,
        loves: req.body.loves,
        imgName: req.body.imgName,
        games: req.body.games,
        wins: req.body.wins,
        defeats: req.body.defeats

    };
    db_connect
        .collection("Hamstersh")
        .insertOne(newHamster, function (err, result) {
            if (err) res.status(400)
            res.json(result).res.status(200)
        });
});

hamstershRoutes.route("/deleteHamster").delete(function (req, res) {
    let db_connect = dbo.getDb();
    let deleteThisHamster = { _id: ObjectId(req.body.id) };
    db_connect
        .collection("Hamstersh")
        .deleteOne(deleteThisHamster, function (err, results) {
            if (err) res.status(400)
            res.json(results)
        })
});


hamstershRoutes.route("/hamsterChampion").put(async function (req, res) {
    let credentials = req.body
    console.log("credentials", credentials);

    let db_connect = dbo.getDb();

    let findHamsters = {
        _id: ObjectId(credentials.winner._id)
    }

    await db_connect.collection("Hamstersh")
        .findOne({
            _id: ObjectId(credentials.winner._id)
        }, async function (err, isMatch) {
            if (err) res.status(400)
            let newObject = {
                $set: {
                    ...isMatch,
                    wins: isMatch.wins + 1,
                    games: isMatch.games + 1
                }
            }
            console.log(isMatch);

            await db_connect
                .collection('Hamstersh')
                .updateOne(findHamsters, newObject, function (err, result) {
                    if (err) res.status(400)
                    res.status(200)
                })

        })


    let findLoser = {
        _id: ObjectId(credentials.loser._id)
    }

    await db_connect.collection("Hamstersh")
        .findOne({
            _id: ObjectId(credentials.loser._id)
        }, async function (err, isMatch) {
            if (err) res.status(400)
            let newObject = {
                $set: {
                    ...isMatch,
                    defeats: isMatch.defeats + 1,
                    games: isMatch.games + 1
                }
            }
            console.log(isMatch);

            await db_connect
                .collection('Hamstersh')
                .updateOne(findLoser, newObject, function (err, result) {
                    if (err) res.status(400)
                    res.status(200)
                })

        })


    db_connect.collection("Hamstersh")
        .find({})
        .toArray(function (err, result) {
            if (err) res.status(400);
            res.json(result)
        })

})

module.exports = hamstershRoutes