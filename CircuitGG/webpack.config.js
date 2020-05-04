var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: {
        welcome: './src/welcome.js',
        login: './src/login.js',
        profile: './src/profile.js', 
        event: './src/event.js',
        about: './src/about.js',
        contact: './src/contact.js',
        signup: './src/signup.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.(jpg)$/,
                use: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        historyApiFallback: {
            index: 'welcome.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Welcome',
            // Minify html

            //   minify: {
            //       coolapseWhitespace: true
            //   },
            // Generate hash number

            //   hash: true, to check if linked file are the same

            // change html file output location
            filename: 'welcome.html',
            excludeChunks: ['login', 'profile', 'event', 'contact', 'about', 'signup'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            filename: 'login.html',
            chunks: ['login'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Profile',
            filename: 'profile.html',
            chunks: ['profile'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Event',
            filename: 'event.html',
            chunks: ['event'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'About',
            filename: 'about.html',
            chunks: ['about'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Contact',
            filename: 'contact.html',
            chunks: ['contact'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'Signup',
            filename: 'signup.html',
            chunks: ['signup'],
            template: './src/template.html' // Load a custom template (lodash by default see the FAQ for details)
        }),
        new ExtractTextPlugin("[name].css"),
    ]
}