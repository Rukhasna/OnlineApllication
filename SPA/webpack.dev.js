const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common,{
    mode:'development',
    module: {
        rules:[{
            test: /\.(qext)$/,
            loader: 'null-loader'
        }]
    },
    devtool: 'inline-source-map',
    devServer: { contentBase: './dist'}
})