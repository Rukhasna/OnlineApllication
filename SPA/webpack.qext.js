const { merge }= require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode:'production',
    module: {
        rules: [{
            test: /\.(qext)$/,
            use: [{loader: 'file-loader', options: {name: '[name].[ext]'}}]
        }]
    },
})