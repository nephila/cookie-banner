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
                    'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                }
            }
        },
        jshint: {
            files: ["src/<%= pkg.name %>.js"],
        },
        copy: {
            main: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js',
            },
        },
        clean: ["dist/"]

    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'uglify', 'copy']);
    grunt.registerTask('ci', ['jshint', 'qunit']);
};