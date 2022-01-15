const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
__webpack_base_uri__ = 'http://localhost:8080';

module.exports ={ 
    entry: './src/index.tsx',
    mode: 'production',
    output:{
        path: path.join(__dirname, '../api/', 'public'),
        filename: 'bundle.[fullhash].js'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module:{
        rules:[
            {
                test: /\.(jpg|png|gif|svg|ttf|woff|eot)$/,
                use: {
                    loader:'file-loader',
                    options:{
                        name: '[name].[hash].[ext]',
                    }
                },
                exclude: /node_modules/
            },
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
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/assets/index.html'
        })
    ],
};