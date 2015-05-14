module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['tests/tests.html']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n'
            },
            build: {
                files: {
                    'build/cookiebanner-<%= pkg.version %>.min.js': 'src/cookiebanner.js'
                }
            }
        },
        jshint: {
            files: ["src/cookiebanner.js"],
        },
        clean: ["build/"]

    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'uglify']);
    grunt.registerTask('ci', ['jshint', 'qunit']);
};