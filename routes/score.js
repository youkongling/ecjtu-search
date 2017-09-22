var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = req.cookies.info;
    var _info = {
        year: 2016,
        term: 2
    }
    var formData = {
        student_id: info.number,
        password: info.password,
        year: _info.year,
        term: _info.term
    }
    request.post({
        url: 'http://login.liuhongbo.cn/api/v1/queryScore',
        formData: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body)
        var scoreList = {
            scoreNumber: [],
            scoreText: []
        }
        if (err) {
            res.render('score', { score: '程序猿小哥哥抱着服务器跑路了' });
        }
        if (!_body.status) {
            res.render('score', { score: '嘤嘤嘤，小新没有找到' });
        } else {
            var scores = _body.data.score_list;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].score == '合格' || scores[i].score == '良好' || scores[i].score == '中等' || scores[i].score == '优秀' || scores[i].score == '不及格' || scores[i].score == '及格') {
                    scoreList.scoreText.push(scores[i]);
                } else {
                    scoreList.scoreNumber.push(scores[i]);
                }
            }
            // console.log(scoreList)
            res.render('score', { score: scoreList });
        }
    })
});

module.exports = router;