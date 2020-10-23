/* 
    This will be the http server that accepts requests from the Nginx web server
    This module is the http lisenter
*/
const model = require('../model/model.js');

// Create a HTTP web server using Restify the listens on port 8181
const restify = require('restify');
var http = restify.createServer({
    name: 'Pokedex App',
    version: '1.0.0'
});
http.listen(8181);

// Landing page
http.get('/', restify.plugins.serveStatic({
    appendRequestPath: false,
    directory: 'view/html/index.html',
}));

// Serve HTML Files (TODO have not tested yet)
http.get('/view/html/*', restify.plugins.serveStatic({
    appendRequestPath: false,
    directory: 'view/html'
}));

// Serve JavaScript files
http.get('/view/js/*', restify.plugins.serveStatic({
    appendRequestPath: false,
    directory: 'view/js',
}));

// Serve CSS files
http.get('/view/css/*', restify.plugins.serveStatic({
    appendRequestPath: false,
    directory: 'view/css'
}));

// Serve image files
http.get('/view/images/*', restify.plugins.serveStatic({
    appendRequestPath: false,
    directory: 'view/images',
}));

// Handle HTTP GET request for /pokedex route
http.get('/pokedex', async (request, response, next) => {
    response.send(await model.getAllPokemon());
    return next();
});

// Handle HTTP GET request for /pokedex/{name} route
http.get('/pokedex/:name', async (request, response, next) => {
    response.send(await model.getPokemonByName(request.params.name));
    return next();
});

