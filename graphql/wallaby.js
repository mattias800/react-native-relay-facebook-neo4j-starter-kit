process.env.BABEL_ENV = 'test';

module.exports = function (wallaby) {
    return {

        files: [
            'src/**/*.js',
            {pattern: 'src/system/**/*.js', ignore: true},
            {pattern: 'src/**/__tests__/*.js', ignore: true},
        ],

        tests: [
            'src/**/__tests__/**/*.js'
        ],

        compilers: {
            'src/**/*.js': wallaby.compilers.babel()
        }

    };
};

