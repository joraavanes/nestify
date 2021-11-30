const path = require("path");
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'node',
    entry: './api/src/app.ts',
    mode: 'production',
    externalsPresets: { node: true },
    context: __dirname,

    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'api/dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'api/src/config/.env' },
                { from: 'api/public/', to: 'public/' },
            ]
        })
    ],
    resolve:{
        extensions: ['.ts','.js', '.json']
    }
};