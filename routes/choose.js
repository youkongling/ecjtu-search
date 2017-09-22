var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = req.cookies.info;
    var formData = {
        student_id: info.number,
        password: info.password,
        date: '2017-9-22'
    }
    request.post({
        url: config.localUrl.class,
        formData: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body)
        // console.log(_body.status)
        if (err) {
            res.render('choose', { info: '程序猿小哥哥抱着服务器跑路了' });
        }
        if (!_body.status) {
            res.redirect('/');
        } else {
            res.render('choose', { info: '绑定成功' });
        }
    })
});

module.exports = router;