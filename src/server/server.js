// Use dotenv to pull in private API setup variables from the .env file (not stored on GitHub)
const dotenv = require( 'dotenv' );
dotenv.config();

// Require all necessary packages
const path = require( 'path' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

// Create instance of the express server and apply settings
const app = express();
app.use( express.static( 'dist' ) );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() );

// Import API libraries
const Geonames = require( 'geonames.js' );
const DarkSky = require( 'dark-sky' );

// Initialize API libraries
const geonames = new Geonames( {
	username: process.env.GEONAMES_API_USERNAME,
	lang: 'en',
	encoding: 'JSON'
});

// Setup server port and apply listener
const port = 8080;
app.listen( port, () => {

	console.log( `NLP app is listening on port ${port}.` );

});

// Setup default route for app
app.get( '/', ( request, response ) => {

	response.sendFile( 'dist/index.html' );

});

// Setup route for getting weather forcast.
app.post( '/geo-coords', ( request, response ) => {

	geonames.search( { 'q': request.body.destination } )
	.then( geonamesResponse => {

		const data = {
			'countryName': geonamesResponse.geonames[0].countryName,
			'longitude': geonamesResponse.geonames[0].lng,
			'latitude': geonamesResponse.geonames[0].lat,
			'error': ""
		}

		response.send( data );
	})
	.catch(
		( error ) => {
			
			const data = {
				'countryName': '',
				'longitude': '',
				'latitude': '',
				'error': error
			}
			response.send( data );
		}
	);

});