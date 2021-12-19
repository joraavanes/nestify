const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
__webpack_base_uri__ = 'http://localhost:8080';

module.exports ={ 
    entry: './src/index.tsx',
    mode: 'development',
    output:{
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module:{
        rules:[
            {
                use: 'ts-loader',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/
            },
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader', 'sass-loader'],
                test: /\.scss$|\.css$/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/assets/index.html'
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        open: true,
        historyApiFallback: true
    }
};