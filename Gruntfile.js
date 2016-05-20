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
				files: {
					'static/js/data.min.js': [
                        'dev/js/abilities.js',
                        'dev/js/natures.js',
                        'dev/js/pokemon.js',
                        'dev/js/moves.js',
                        'dev/js/items.js',
                        'dev/js/exp.js',
                        'dev/js/data.js'
                    ],
                    'static/js/eevee.min.js': [
                        'dev/js/field.js',
                        'dev/js/script.js'
                    ]
				}
			}
		},
		watch: {
			sass: {
				files: '**/*.js',
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
