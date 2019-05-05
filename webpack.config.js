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
        }
    }
};
