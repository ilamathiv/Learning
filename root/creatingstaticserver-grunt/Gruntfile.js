module.exports = function ( grunt ) {

	grunt.initConfig({
		"connect": {
			"server": {
				"options" : {
					hostname: "localhost",
					port: 8324,
					keepalive: true
				}
			},
			"server2": {
				"options" : {
					hostname: "localhost",
					port: 8325,
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.registerTask( "default", "connect" );
	grunt.registerTask( "server2", "connect:server2" );

};
