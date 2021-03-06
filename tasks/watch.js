/**
 * Watch for file changes
 */
'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return () => {
        gulp.watch(`./${options.src}/js/**/*`, gulp.series(options.tasks.esLint, options.tasks.buildCustomJs));

        gulp.watch(`./${options.src}/scss/**/*`, gulp.series(options.tasks.buildSass, options.tasks.buildSassCustom));

        gulp.watch(`./${options.src}/html/**/*`, gulp.series(options.tasks.fileInclude, options.tasks.htmlHint));

        gulp.watch(`./${options.src}/fonts/**/*.{eot,svg,ttf,woff,woff2}`, gulp.series(options.tasks.copyFolders));

        gulp.watch(`./${options.src}/icon-svg/*`, gulp.series(options.tasks.svgSprite));

        gulp.watch(`./${options.src}/images/**/*.+(${options.imageExtensions})`)
            .on('unlink', (path) => {
                options.deleteFile(
                    {
                        path,
                        event: 'unlink',
                    },
                    options.src,
                    options.dest
                );
            })
            .on('add', gulp.series(options.tasks.imageMin, options.tasks.imageWebP));

        gulp.watch([`./${options.dest}/**/*`, `!./${options.dest}/**/*.map`, `./*.html`]).on('change', options.browserSync.reload);
    };
};
