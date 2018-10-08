var mongo = require('mongodb');
var config = require('../config')
var client = mongo.MongoClient;
var db;
var connetUrl = "mongodb://" + config.MONOGO.user + ":" + config.MONOGO.password + "@" + config.MONOGO.host + "/" + config.MONOGO.database
client.connect(connetUrl, {},
    function (err, database) {
        if (err) throw err;
        db = database;
    });
exports.db = db;
exports.find = find;
exports.findOne = findOne;
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.toJson = toJson;

function find(collection, selector, callback) {
    if (!selector) selector = {};
    try {
        //db.collection(collection).find(selector).toArray(function(err, docs) {
        db.collection(collection).find(selector).sort({ '_id': -1 }).limit(50).toArray(function (err, docs) {
            callback && callback(docs);
        });
    } catch (error) {
        callback && callback([], error);
        console.log(error);
    }
}

function findOne(collection, selector, callback) {
    try {
        db.collection(collection).findOne(selector, function (err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function update(collection, selector, document, callback, isUpsert = false, isMulti = false) {
    try {
        db.collection(collection).update(selector, document, { upsert: isUpsert, multi: isMulti }, function (err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function remove(collection, selector, callback) {
    try {
        db.collection(collection).remove(selector, function (err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback([], error);
        console.log(error);
    }
}

function toJson(rows) {

}

function insert(collection, data, callback) {
    try {
        db.collection(collection).insert(data, function (err, doc) {
            callback(doc, err);
        });
    } catch (error) {
        callback(false, error);
        console.log(error);
    }
}