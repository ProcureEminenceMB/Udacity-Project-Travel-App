import { validDestination, validDate } from './inputValidation';

const calcNumDays = ( tripInfo ) => { // Calculate number of days before trip.

	const dateArray = tripInfo.date.split( '/' );
	let tripDate = new Date( parseInt( dateArray[2] ), parseInt( dateArray[0] ) - 1, parseInt( dateArray[1] ) ); // Year, Month Index, Day. Month index = month - 1.
	let currentDate = new Date();
	const dateDiff = tripDate.getTime() - currentDate.getTime();
	const numSeconds = Math.floor( dateDiff / 1000 );
	const numMinutes = Math.floor( numSeconds / 60 );
	const numHours = Math.floor( numMinutes / 60 );
	const numDays = Math.floor( numHours / 24 );

	return numDays;

};

const insertTrip = ( tripInfo ) => {

	const numDays = calcNumDays( tripInfo );

	let tripDisplay = `
		<div class="tripEntry">
			<div class="tripLeftContent">
				<div class="tripImageContainer"></div>
				<br>
				<button class="tripAddNotesButton roundedButton">Add Notes</button>
			</div>
			<div class="tripRightContent">
				<div class="tripHeader">
					<h2>My Trip to: <span class="tripLocation">${tripInfo.destination}</span>
					<br>
					Departing: <span class="tripDate">${tripInfo.date}</span></h2>
				</div>
				<div class="tripflightInfo">
					<div class="flightInfoLabel">
						Flight info:
					</div>
					<div class="flightInfo">
						DIA 4:35PM
						<br>
						Flight 587 United Airlines
					</div>
					<div class="clear"></div>
				</div>
				<div class="tripAddRemove">
					<button class="saveTripButton squareButton">save trip</button> <button class="removeTripButton squareButton">remove trip</button>
				</div>
				<div class="tripCountdown">
					<span class="tripLocation">${tripInfo.destination}</span> is <span class="tripCountdownNum">${numDays}</span> days away.
				</div>
				<div class="tripWeather">
					Typical weather for then is:
					<br>
					<div class="tripWeatherDetails">
						${tripInfo.forecast}
					</div>
				</div>
			</div>
			<div class="tripNotesContainer">
				Notes<br>
				<textarea class="notes"></textarea>
			</div>
		</div>`;

	document.querySelector( '#trips').insertAdjacentHTML( 'beforeend', tripDisplay );

	// Assign event listeners to the new trip buttons.
	let tripEntries = document.querySelectorAll( '.tripEntry' );
	const entryIndex = tripEntries.length - 1;
	const latestEntry = tripEntries[ entryIndex ];
	latestEntry.querySelector( '.tripAddNotesButton' ).addEventListener( 'click', () => { TravelApp.addNotes( entryIndex ); } );
	latestEntry.querySelector( '.saveTripButton' ).addEventListener( 'click', () => { TravelApp.updateTrip( entryIndex ); } );
	latestEntry.querySelector( '.removeTripButton' ).addEventListener( 'click', () => { TravelApp.removeTrip( entryIndex ); } );

	// Set image url.
	latestEntry.querySelector( '.tripImageContainer' ).style.backgroundImage = `url(${tripInfo.image})`;

	// Show notes if they exist.
	if( tripInfo.notes != '' ){

		document.querySelectorAll( '.notes' )[entryIndex].value = tripInfo.notes;
		addNotes( entryIndex );

	}

};

const getGeoCoords = async ( tripInfo ) => {

	const response = await fetch( '/geo-coords', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( {
				'destination': tripInfo.destination,
				'date': tripInfo.date
			})
		});

	try{

		const data = await response.json();
		tripInfo.latitude = data.latitude;
		tripInfo.longitude = data.longitude;
		tripInfo.country = data.country;

		return tripInfo;

	}catch( error ){

		console.log( error );

	}

};

const getForecast = async ( tripInfo ) => {

	const response = await fetch( '/forecast', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( {
				'latitude': tripInfo.latitude,
				'longitude': tripInfo.longitude,
				'date': tripInfo.date
			})
		});

	try{

		const data = await response.json();

		tripInfo.forecast = data.hourly.summary;

		return tripInfo;

	}catch( error ){

		console.log( error );
		
	}

};

const getImage = async ( tripInfo ) => {

	const response = await fetch( '/image', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( {
				'destination': tripInfo.destination,
				'country': tripInfo.country
			})
		});

	try{

		const data = await response.json();

		tripInfo.image = data.hits[0].webformatURL;

		return tripInfo;

	}catch( error ){

		console.log( error );

	}

};

const addTrip = ( event ) => {

	event.preventDefault(); // Prevent page refresh caused by form submission.
	
	const destInput = event.target[0].value; // Destination input.
	const dateInput = event.target[1].value; // Date input.

	if( !validDestination( destInput ) || !validDate( dateInput ) ) {

		return

	};
	
	const tripInfo = {
		'destination': destInput,
		'date': dateInput,
		'country': '',
		'latitude': '',
		'longitude': '',
		'forecast': '',
		'notes': ''
	}

	getGeoCoords( tripInfo )
		.then( ( tripInfo ) => {

			return getForecast( tripInfo );

		}).then( ( tripInfo ) => {

			return getImage( tripInfo );

		})
		.then( ( tripInfo ) => {

			insertTrip( tripInfo );
			saveTrip( tripInfo ); // Add trip to localStorage.

		})
		.catch( ( error ) => {

			console.log( error );

		});

};

const addNotes = ( index ) => {

	document.querySelectorAll( '.tripNotesContainer' )[index].style.display = 'block';

};

const saveTrip = ( tripInfo ) => {

	try{

		if( localStorage.getItem( 'trips' ) == null ){ // Add 'trips' entry in localStorage if it doesn't exist.

			let tripsArray = [tripInfo];
			localStorage.setItem( 'trips', JSON.stringify( tripsArray ) );

		}else{ // Update the 'trips' entry in localStorage.
			
			let tripsArray = JSON.parse( localStorage.getItem( 'trips' ) );
			tripsArray.push( tripInfo );
			localStorage.setItem( 'trips', JSON.stringify( tripsArray ) );

		}

	}catch( error ){

		alert( 'Error: Your local storage is disabled and will prevent this app from functioning properly.' );

	}

};

const updateTrip = ( index ) => {

	try{

		if( localStorage.getItem( 'trips' ) == null ){ // Skip if 'trips' doesn't exist in localStorage.

			alert( 'Trip could not be saved.' );

		}else{ // Update the 'trips' entry in localStorage.
			
			let tripsArray = JSON.parse( localStorage.getItem( 'trips' ) );
			tripsArray[index].notes = document.querySelectorAll( '.notes' )[index].value;
			localStorage.setItem( 'trips', JSON.stringify( tripsArray ) );
			alert( 'Trip saved' );

		}

	}catch( error ){

		console.log( error );
		alert( 'Error: Your local storage is disabled.' );

	}

};

const loadTrips = () => {

	try{

		if( localStorage.getItem( 'trips' ) != null ){

			let tripsArray = JSON.parse( localStorage.getItem( 'trips' ) );

			for( let trip of tripsArray ){

				insertTrip( trip );

			}

		}

	}catch( error ){ console.log( error ) }

};

const removeTrip = ( index ) => {

	// Remove trip
	try{

		if( localStorage.getItem( 'trips' ) != null ){

			let tripsArray = JSON.parse( localStorage.getItem( 'trips' ) );
			tripsArray.splice( index, 1 );
			localStorage.setItem( 'trips', JSON.stringify( tripsArray ) );

		}

	}catch( error ){}

	document.querySelector( '#trips').innerHTML = "";
	loadTrips(); // Reload all remaining trips to update indexing.

};

const init = () => {

	document.querySelector( '#tripForm' ).addEventListener( 'submit', addTrip );

	loadTrips(); // Load all trips that are saved in localStorage.

};

export {
	calcNumDays,
	insertTrip,
	getGeoCoords,
	getForecast,
	getImage,
	addTrip,
	addNotes,
	saveTrip,
	updateTrip,
	loadTrips,
	removeTrip,
	init
};