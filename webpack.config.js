module.exports = {
    entry: './widget.js',
    output: {
        path: __dirname + '/dist',
        filename: 'cout-embauche-widget.js'
    },
    module: {
        loaders: [
            { test: /\.css$/,  loader: 'style!css' },
            { test: /\.html$/, loader: 'html' },
        ]
    }
};
