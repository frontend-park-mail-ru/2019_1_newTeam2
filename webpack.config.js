const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist')
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, './public/components'),
            Controllers: path.resolve(__dirname, './public/controllers'),
            Services: path.resolve(__dirname, './public/services'),
            Models: path.resolve(__dirname, './public/models'),
            Views: path.resolve(__dirname, './public/views'),
            Templates: path.resolve(__dirname, './public/templates'),
            Styles: path.resolve(__dirname, './public/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader' 
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
