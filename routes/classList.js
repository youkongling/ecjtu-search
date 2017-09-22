var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = req.cookies.info;
    var now = new Date();
    var _info = {
        yesterday: getDate(now, -1),
        today: getDate(now, 0),
        tomorrow: getDate(now, 1),
        afterTomorrow: getDate(now, 2)
    }
    var formData = {
        yesterday: {
            student_id: info.number,
            password: info.password,
            date: _info.yesterday
        },
        today: {
            student_id: info.number,
            password: info.password,
            date: _info.today
        },
        tomorrow: {
            student_id: info.number,
            password: info.password,
            date: _info.tomorrow
        },
        afterTomorrow: {
            student_id: info.number,
            password: info.password,
            date: _info.afterTomorrow
        }
    }
    var classList = {
        yesterday: [],
        today: [],
        tomorrow: [],
        afterTomorrow: []
    }
    // console.log(0);
    request.post({
        url: config.localUrl.class,
        formData: formData.yesterday
    }, function(err, response, body) {
        var _body = JSON.parse(body);
        if (err) {
            console.err(err);
        }
        if (_body.status) {
            var classItem = _body.data.today_class_list;
            // console.log(classItem)
            for (var i = 0; i < classItem.length; i++) {
                classList.yesterday.push(classItem[i]);
            }
        }
        // console.log(1);
        (function(){
            request.post({
                url: config.localUrl.class,
                formData: formData.today
            }, function(err, response, body) {
                var _body = JSON.parse(body);
                if (err) {
                    console.err(err);
                }
                if (_body.status) {
                    var classItem = _body.data.today_class_list;
                    // console.log(classItem)
                    for (var i = 0; i < classItem.length; i++) {
                        classList.today.push(classItem[i]);
                    }
                }
                // console.log(2);
                (function(){
                    request.post({
                        url: config.localUrl.class,
                        formData: formData.tomorrow
                    }, function(err, response, body) {
                        var _body = JSON.parse(body);
                        if (err) {
                            console.err(err);
                        }
                        if (_body.status) {
                            var classItem = _body.data.today_class_list;
                            // console.log(classItem)
                            for (var i = 0; i < classItem.length; i++) {
                                classList.tomorrow.push(classItem[i]);
                            }
                        }
                        // console.log(3);
                        (function(){
                            request.post({
                                url: config.localUrl.class,
                                formData: formData.afterTomorrow
                            }, function(err, response, body) {
                                var _body = JSON.parse(body);
                                if (err) {
                                    console.err(err);
                                }
                                if (_body.status) {
                                    var classItem = _body.data.today_class_list;
                                    // console.log(classItem)
                                    for (var i = 0; i < classItem.length; i++) {
                                        classList.afterTomorrow.push(classItem[i]);
                                    }
                                }
                                // console.log(4);
                                // console.log(classList);
                                res.render('classList', { classInfo: classList });
                            })
                        })();
                    })
                })();
                
            })
        })();
        
    })

    // res.render('classList', { classInfo: classList });
});

function getDate(date, num) {
    var year = date.getFullYear();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate() + num;
    var seperator = "-";
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var nowDate = year + seperator + nowMonth + seperator + strDate;
    return nowDate;
}


module.exports = router;