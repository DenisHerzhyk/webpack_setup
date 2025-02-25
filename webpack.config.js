const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

new EslintWebpackPlugin({
    extensions: ['.js'],
    fix: true
})

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const optimization = () => ({
    splitChunks: {
        chunks: 'all'
    },
    minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
    ]
})

const setPlugins = () => [
    new htmlWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, './src/images/webpack.svg'),
                to: path.resolve(__dirname, 'dist')
            }
        ]
    }),
    new MiniCssExtractPlugin({
        filename: filename('css'),
    })
]

const jsLoader = (extra) => {
    const loader = [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env'
                ]
            }
        }
        ]
        if (extra) loader[0].options.presets.push(extra);
        return loader
}

const cssLoader = (extra) => {
    const loader = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ''
            }
        },
        'css-loader'
    ]
    if (extra) {
        loader.push(extra)
    }
    return loader
}

module.exports = {
    mode: 'development',
    target: 'web',
    devServer: {
        port: 4200,
        hot: false
    },
    entry: {
        main: './src/main.jsx',
        stat: './src/statistics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: optimization(),
    plugins: setPlugins(),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        }
    },
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader(),
            },
            {
                test: /\.less$/,
                use: cssLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/ ,
                use: jsLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: jsLoader('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: jsLoader('@babel/preset-react')
            }
        ]
    }
}
