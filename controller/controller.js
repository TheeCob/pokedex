/* 
    This will be the http server that accepts requests from the Nginx web server
    This module is the http lisenter
*/

// Get a connection to the PostgreSQL instance
// Uses config from .env
const {Client} = require('pg');
const client = new Client();
client.connect();

// Promises for database queries to make sure data is returned before response is sent
/* Get all pokemon */
function getAllPokemon() {
    return new Promise( (resolve, reject) => {
        client.query("select * from tblpokemon order by intpokemonid", (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    }).then((rows) => {
        return rows;
    }).catch((error) => {
        console.log(error.stack);
    });
}

/* Get pokemon by id */
function getPokemonByName(name) {
    return new Promise( (resolve, reject) => {
        client.query("select * from tblpokemon where lower(strpokemonname) = lower('" + name + "')", (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows[0]);
            }
        });
    }).then((row) => {
        return row;
    }).catch((error) => {
        console.log(error.stack);
    });
}

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

// Server HTML Files (TODO have not tested yet)
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
    response.send(await getAllPokemon());
    return next();
});

// Handle HTTP GET request for /pokedex/{name} route
http.get('/pokedex/:name', async (request, response, next) => {
    response.send(await getPokemonByName(request.params.name));
    return next();
});

