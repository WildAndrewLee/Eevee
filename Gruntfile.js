module.exports = function(grunt) {
	var grunt_options = {
		jshint: {
			files: ['dev/js/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		uglify: {
			everything: {
                options: {
                    beautify: false
                },
				files: {
                    'static/js/eevee.min.js': [
                        'dev/js/lib/*.js',
                        'dev/js/jquery.disable.js',
                        'dev/js/util.js',
                        'dev/js/rng.js',
                        'dev/js/crypto.js',
                        'dev/js/cache.js',
                        'dev/js/api.js',
                        'dev/js/field.js',
                        'dev/js/pokemon.js',
                        'dev/js/eevee.js',
                        'dev/js/script.js'
                    ]
				}
			}
		},
        cssmin: {
            everything: {
                files: {
                    'static/css/bundle.min.css': ['dev/css/normalize.css', 'dev/css/style.css']
                }
            }
        },
		watch: {
			js: {
				files: 'dev/js/*.js',
				tasks: ['jshint', 'uglify']
			},
            css: {
                files: 'dev/css/*.css',
                tasks: ['cssmin']
            }
		}
	};

	grunt.initConfig(grunt_options);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};
