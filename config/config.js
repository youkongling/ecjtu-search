var config = {
    localUrl: {
        class: 'http://login.liuhongbo.cn/api/v1/queryTodaySchedule',
        score: 'http://login.liuhongbo.cn/api/v1/queryScore',
        user: 'http://login.liuhongbo.cn/api/v1/saveInfo'
    },
    netUrl: {
        class: '127.0.0.1:8001/api/v1/queryTodaySchedule',
        score: '127.0.0.1:8001/api/v1/queryScore'
    }
}

module.exports = config;