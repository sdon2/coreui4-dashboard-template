const mix = require('laravel-mix');
const path = require('path');

mix.disableNotifications();

mix.js('resources/js/app.js', 'public/js')
    .vue({ version: 3 })
    .sass('resources/scss/app.scss', 'public/css');

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        }
    },
    output: {
        chunkFilename: "js/[name].js?id=[chunkhash]",
    },
});
