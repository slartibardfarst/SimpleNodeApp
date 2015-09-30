var Hapi = require('hapi');
var Good = require('good');
var fs = require('fs');


var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        
        var data = "pp";
        fs.readFile('version_info/build_number.txt', 'utf8', function (err,data) {
          if (err) {
            return console.log('got an error: ' + err);
          }
          reply('Hello, version v' + data);
        });

console.log('here is the data' + data);
        //reply('Hello, feature 1!' + data);
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
