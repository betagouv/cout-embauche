var webpack = require('webpack');


module.exports = {
    entry: {
        'cout-embauche-widget': './widget.js',
        'bootstrap-compat': './js/compat/bootstrap.js',
    },
    output: {
        path: 'dist',
        filename: '[name].js',
    },
    module: {
        loaders: [
            { test: /\.css$/,  loader: 'style!css' },
            { test: /\.html$/, loader: 'html' },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'cout-embauche-widget',
            filename: 'cout-embauche-widget.js',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bootstrap-compat',
            filename: 'bootstrap-compat.js',
            async: true,
        }),
    ]
};
