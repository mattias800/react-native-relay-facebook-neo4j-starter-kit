var babel = require('babel-core');

process.env.BABEL_ENV = 'test';

var babelConfig = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '.babelrc')));
babelConfig.babel = babel;

module.exports = function (wallaby) {
    return {

        debug: false,

        files: [
            {pattern: 'node_modules/babel-polyfill/lib/index.js', instrument: false},
            'src/**/*.js',
            {pattern: 'src/system/**/*.js', ignore: true},
            {pattern: 'src/**/__tests__/*.js', ignore: true},
        ],

        tests: [
            'src/**/__tests__/**/*.js'
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel(babelConfig)
        },

        bootstrap: function () {
            require('babel-polyfill');
        },

        env: {
            type: 'node',
            params: {
                // node flags
                runner: '--harmony --harmony_arrow_functions',
                // env vars
                env: 'PARAM1=true;PARAM2=false'
            }
        }

    };
};

