var webpack = require('webpack');
var prefix = require('postcss-prefix-selector')


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
            {
                test:   /\.css$/,
                loader: "style!css!postcss-loader"
            },
            { test: /\.html$/, loader: 'html' },
        ]
    },
    postcss: function () {
        return [
          prefix({
            prefix: '.SGMAPembauche ', // <--- notice the trailing space!
            exclude: ['.SGMAPembauche'] // in order to style the prefix itself in  the .css
          })
        ];
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
