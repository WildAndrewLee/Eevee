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
                        'dev/js/data/abilities.js',
                        'dev/js/data/natures.js',
                        'dev/js/data/pokemon.js',
                        'dev/js/data/moves.js',
                        'dev/js/data/items.js',
                        'dev/js/data/exp.js',
                        'dev/js/data/growth.js',
                        'dev/js/data/forms.js',
                        'dev/js/data/gender.js',
                        'dev/js/data/data.js'
                    ],
                    'static/js/eevee.min.js': [
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
