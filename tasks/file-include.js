/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

module.exports = function (options) {
    return () => {
        return gulp
            .src(`./${options.templates}/**/*.html`)
            .pipe(
                fileinclude({
                    prefix: '@@',
                    basepath: `./${options.templates}`,
                    indent: true,
                    context: {
                        NODE_ENV: process.env.NODE_ENV || 'development',
                        BUILD_VERSION: Date.now().toString(16).substr(-6),
                    },
                })
            )
            .pipe(gulp.dest(options.dest));
    };
};
