module.exports = function(grunt) {
	//Configuration Section
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				separator : ";;"
			},
			output: {
		      files: {
		      	'dist/js/<%= pkg.name %>.js' : 'src/*.js' 
		      }
		    }
		},

		sass: {
		    dist: {
		        files: {
		            'dist/css/master.css': 'assets/sass/master.scss'
		        }
		    }
		} 
	});



	//Load Plugin Section
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	//Task Register Section
	grunt.registerTask('default', 'uglify');
	grunt.registerTask('scss', 'sass');

};