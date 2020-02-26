// Use dotenv to pull in private API setup variables from the .env file (not stored on GitHub)
const dotenv = require( 'dotenv' );
dotenv.config();

// Require all necessary packages
const path = require( 'path' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const fetch = require( 'node-fetch' );

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

const darksky = new DarkSky( process.env.DARK_SKY_API_KEY );

let tripData = {};

// Setup server port and apply listener
const port = 8080;
app.listen( port, () => {

	console.log( `Travel app is listening on port ${port}.` );

});

// Setup default route for app
app.get( '/', ( request, response ) => {

	response.sendFile( 'dist/index.html' );

});

// Setup route for getting geographic coordinates.
app.post( '/geo-coords', ( request, response ) => {

	geonames.search( { 'q': request.body.destination } )
	.then( geonamesResponse => {

		tripData = {
			'country': geonamesResponse.geonames[0].countryName,
			'longitude': geonamesResponse.geonames[0].lng,
			'latitude': geonamesResponse.geonames[0].lat,
			'error': ""
		}

		response.send( tripData );
	})
	.catch(
		( error ) => {
			
			tripData = {
				'country': '',
				'longitude': '',
				'latitude': '',
				'error': error
			}
			response.send( tripData );
		}
	);

});

// Setup route for getting forcast information.
app.post( '/forecast', ( request, response ) => {

	// Format date.
	const dateArray = request.body.date.split( '/' );
	const date = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`; // yyyy-mm-dd

	darksky
		.options({
			latitude: request.body.latitude,
			longitude: request.body.longitude,
			time: date,
			language: 'en',
			exclude: ['minutely', 'daily']
		})
		.get()
		.then( ( res ) => {

			response.send( res );

		})
		.catch( ( error ) => {

			response.send( error );

		});

});

// Setup route for getting image path based on location.
app.post( '/image', async ( request, response ) => {

	const localURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent( request.body.destination )}`;
	const countryURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent( request.body.country )}`;

	let res = await fetch( localURL );
	let json = await res.json();

	if( json.hits.length > 0 ) {

		response.send( json );

	}else{

		res = await fetch( countryURL );
		json = await res.json();

		response.send( json );

	}
	
});