var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')


var config = {
    cache: true,
    entry: {
        styles: path.join(__dirname, 'styles/main.scss'),
        app: path.join(__dirname, 'source/app.jsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!resolve-url-loader!sass-loader?sourceMap'})
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 100
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: 'static'
        }])
    ]
}


if (process.env.NODE_ENV == 'production') {
    var defineProd = new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify('production')}
    })
    config.plugins.push(defineProd)
} else {
    config.devtool = '#cheap-module-source-map'
}

module.exports = config
