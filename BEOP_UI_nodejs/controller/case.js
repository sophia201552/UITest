var mongo = require('../util/mongoHelper')
var collection = 'AutoTest_Log'
var getTestLog = function(query,callback){
    mongo.find(collection,query,callback)
}
var getOneTestLog = function(query,callback){
    mongo.findOne(collection,query,callback)
}
var inserTestLog = function(log,callback){
    mongo.insert(collection,log,callback)
}
var removeCase = function (query, callback) {
    mongo.remove(collection,query,callback)
}

exports.getTestLog = getTestLog
exports.inserTestLog = inserTestLog
exports.getOneTestLog = getOneTestLog
exports.removeCase = removeCase

