module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		tslint: {
			options: {
				configuration: grunt.file.readJSON('src/.tslintrc.json')
			},
			build: {
				src: ['src/*.ts']
			}
		},
		ts: {
			build: {
				src: ['src/*.ts'],
				out: 'threadsWatcher.js',
				options: {
					// 'es3' (default) | 'es5'
					target: 'es5',
					// true (default) | false
					sourceMap: false,
					// true (default) | false
					removeComments: false,
					htmlModuleTemplate: '<%= filename %>',
					htmlVarTemplate: '<%= ext %>'
				}
			}
		},
		'string-replace': {
			version: {
				files: {
					'threadsWatcher.js': 'threadsWatcher.js'
				},
				options: {
					replacements: [
						{
							pattern: /{{ VERSION }}/g,
							replacement: '<%= pkg.version %>'
						}
					]
				}
			}
		},
		jsbeautifier: {
			files: ['threadsWatcher.js'],
			options: {
				js: {
					indentWithTabs: true,
					jslintHappy: true,
					wrapLineLength: 120
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-jsbeautifier');

	grunt.registerTask('default', [
		'tslint',
		'ts:build',
		'string-replace:version',
		'jsbeautifier'
	]);

	grunt.registerTask('debug-build', [
		'ts:build',
		'string-replace:version',
		'jsbeautifier'
	]);
};
