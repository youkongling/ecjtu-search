var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = req.cookies.info;
    var _info = {
        year: 2017,
        term: 1
    }
    var formData = {
        student_id: info.number,
        password: info.password,
        year: _info.year,
        term: _info.term
    }
    request.post({
        url: 'http://login.liuhongbo.cn/api/v1/queryClass',
        formData: formData
    }, function(err, response, body) {
    	var _body = JSON.parse(body)
    	if(err){
    		res.render('classList', { classInfo: '程序猿小哥哥抱着服务器跑路了' });
    	}
    	if(!_body.status){
    		// console.log("here")
    		res.render('classList', { classInfo: '嘤嘤嘤，小新没有找到' });
    	}else{
    		console.log(_body.data.class_list.monday[1][0].class_name)
    		res.render('classList', { classInfo: _body.data.class_list });
    	}
    })
});

module.exports = router;