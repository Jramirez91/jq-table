var webpack = require('webpack');
var path = require('path');

//Nombre de la dirección final donde se publicara el componente
var BUILD_DIR = path.resolve(__dirname, 'public');
// var BUILD_DIR = path.resolve(__dirname, 'public/minutas');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,        
        filename: 'table-tic.js'
        //filename: 'bundle.js'
    }, module: {
        loaders: [
            {
                test: /\.js|\.jsx?/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;