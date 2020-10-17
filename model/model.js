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

exports.getAllPokemon = getAllPokemon;
exports.getPokemonByName = getPokemonByName;