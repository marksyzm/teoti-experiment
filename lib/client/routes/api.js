'use strict';

var request = require('request');

exports.private = function(req, res){
    var url = config.get('api:url') + req._parsedUrl.path.replace('/api', '');

    var options = {
        url: url,
        method: req.method,
        headers : req.headers,
        json: true
    };

    if (req.method === 'POST') {
        options.form = req.body;
    }

    if (req.method === 'PUT') {
        options.body = req.body;
    }



    //req.headers.userid = req.session.passport.user.id;
    //req.headers.token = req.session.passport.user.token;
    request(options).pipe(res);
};