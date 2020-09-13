const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: { 'shopping' : './src/index.js'} ,
    
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                   {
                        loader: "html-loader",
                        options: { minimize : false }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
              },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader",
                     "css-loader",
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            title: 'shopping'
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
        
    }
}
