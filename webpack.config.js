var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry : './app/index.js',
    output : {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: './'
    },
    module : {
        rules: [
            {  test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader'},
            {  test: /\.(css)$/, use: ['style-loader','css-loader']}
        ]
    
    },
    devServer: {
        host:'0.0.0.0',
        disableHostCheck: true,
        port:3000,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ] 
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production') //set when compile
        })
    );
}

module.exports = config