const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
    stats: 'errors-warnings',
    mode: 'development',
    infrastructureLogging: {
        level: 'warn',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        open: true,
        port: 3000,
    },
});
