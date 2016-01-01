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
            { test: /\.(css|html|svg)$/, loader: 'file' },
            { test: /\.(woff2?|ttf|eot)$/, loader: 'url' },
            //{ test: /\.(html|svg)$/, loader: 'ngtemplate!html' },
            { test: /\.(png|gif|jpe?g)$/, loader: 'url', exclude: [/sickle\//] },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "css?sourceMap!autoprefixer?{cascade:false,browsers:[\"last 2 version\",\"ie >= 9\"]}!sass?sourceMap"
                )
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
