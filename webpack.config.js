'use strict';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./lib/shared/config');

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
            //{ test: /\.html$/, loader: 'file' },
            { test: /\.html$/, loader: 'ngtemplate!html', exclude: [/sickle\//] },
            { test: /\.(png|svg|woff2?|gif|jpe?g|ttf|eot)$/, loader: 'url' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap') }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
