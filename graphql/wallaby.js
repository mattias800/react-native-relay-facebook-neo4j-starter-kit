process.env.BABEL_ENV = 'development';

module.exports = function (wallaby) {
    return {

        files: [
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/system/**/*.js', ignore: true},
            {pattern: 'src/**/__tests__/*.js', ignore: true},
        ],

        tests: [
            'src/**/__tests__/**/*.js'
        ],

        compilers: {
            'src/**/*.js': wallaby.compilers.babel()
        },

        testFramework: 'mocha',

        env: {
            type: 'node',
            params: {
                runner: '--harmony --harmony_arrow_functions'
            }
        }

    };
};

