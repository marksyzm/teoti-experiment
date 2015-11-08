'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../../shared/config');

module.exports = {
    entry: './lib/templates/'+config.get('template')+'/index.js',
    output: {
        path: __dirname+'/public/bundle',
        publicPath: '/bundle/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json'},
            { test: /\.(html|svg|woff2?|ttf|eot)$/, loader: 'file' },
            //{ test: /\.(html|svg)$/, loader: 'ngtemplate!html' },
            { test: /\.(png|gif|jpe?g)$/, loader: 'url', exclude: [/sickle\//] },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap") }
        ],
        exprContextCritical: false
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
