const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js',
        stat: './src/statistics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new htmlWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|svg|gif|webp)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
}
