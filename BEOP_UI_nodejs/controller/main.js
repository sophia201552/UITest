var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = webdriver.promise,
    // http = require('http'),
    // url = require('url'),
    querystring = require('querystring')
    chrome = require('selenium-webdriver/chrome'); //TODO: 兼容其他浏览器

var caseModal = require('../modal/caseModal.js');
var caseUtil = require('./case.js');
var ObjectID = require('mongodb').ObjectID;

var CONFIG = require('./../config');
var express = require('express');
var app = express();

//static resource
app.use(express.static('./hall'));

// //post data body
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '1mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

//compression
var compression = require('compression');
app.use(compression());

var config = require('../config');

var cookieSession = require('cookie-session');

var runCallback = function () {

};


app.get('/run', (req, res) => {
    var query = req.query; 
    var filePathPrefix = '../case_ui/terminal/';
    var pool = require('../modal/casePool.js');
    //var caseType = 'case_' + CONFIG.runType;
    var caseList = CONFIG[query.type];
    for (let itemIndex in caseList) { 
        require(caseList[itemIndex]);
    }
    if (query.type == 'case_online') { // 在线 暂未做
        console.log('online-out');
        setInterval(function () {
            console.log(444);
            app.get('/run?type=case_online');
        }, 1000*60*3);
    } else if (query.type == 'case_develop') { // 本地 暂未做
        console.log('offline');
    }

    var getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    var caseResult = {
        startTime: getNowFormatDate(),
        case: [],
        executor: 'owen'
    }

    var rs;
    var flow = promise.controlFlow();
    flow.execute(function () {
        for (let testCase in pool) {
            (function (testCase) {
                flow.execute(function () {
                    rs = pool[testCase].run();
                    rs.startTime = getNowFormatDate();
                }).then(function () {
                    caseResult.case.push({
                        name: testCase,
                        step: rs.value_.step,
                        status: rs.value_.status,
                        startTime: rs.startTime,
                        endTime: getNowFormatDate()
                    });         
                });
            })(testCase);
        }
    }).then(function () {
        caseResult.endTime = getNowFormatDate();
        caseUtil.inserTestLog(caseResult, function () { });
    }).then(function () {
        console.log('自动化测试结束');
    });


    // var code = req.body.code;
    // var password = req.body.password;

    // mysqlHelper.query('select name, password, salt from user where code = ?', [code], function(rows, err) {
    //     if (rows[0][1] == password) {
    //         res.send(preres(true));
    //     } else {
    //         res.send(preres(false));
    //     }
    // });

});

app.post('/testLogList', (req, res) => {
    caseUtil.getTestLog({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
});

app.post('/removeCase', (req, res) => { // 暂无法接收post参数
    caseUtil.removeCase({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
})

app.get('/removeCase', (req, res) => {
    var query = req.query; 
    if (query._id) {
        query._id = ObjectID(query._id);
    }
    caseUtil.removeCase(query, function (resMes, err) {
        if (err) {
            console.log('服务器报错');
            res.send(err);
        }
        if (resMes.result.ok) {
            console.log('删除成功');
            res.send(resMes.result);
        } else {
            console.log('删除失败');
        }
    })
})

app.listen(5858, function () {
    console.log('服务器重启成功!');
});