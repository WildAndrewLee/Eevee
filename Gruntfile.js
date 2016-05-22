module.exports = function(grunt) {
	var grunt_options = {
		jshint: {
			files: ['dev/js/field.js', 'dev/js/script.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		uglify: {
			everything: {
                options: {
                    beautify: true
                },
				files: {
                    'static/js/eevee.min.js': [
                        'dev/js/util.js',
                        'dev/js/api.js',
                        'dev/js/field.js',
                        'dev/js/pokemon.js',
                        'dev/js/script.js'
                    ]
				}
			}
		},
		watch: {
			js: {
				files: 'dev/js/*.js',
				tasks: ['uglify']
			}
		}
	};

	grunt.initConfig(grunt_options);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'uglify']);
};
