import { validDestination, validDate } from './inputValidation';

const insertTrip = ( tripInfo ) => {

	// Calculate number of days before trip.
	const dateArray = tripInfo.date.split( '/' );
	let tripDate = new Date( parseInt( dateArray[2] ), parseInt( dateArray[0] ) - 1, parseInt( dateArray[1] ) ); // Year, Month Index, Day. Month index = month - 1.
	let currentDate = new Date();
	const dateDiff = tripDate.getTime() - currentDate.getTime();
	const numSeconds = Math.floor( dateDiff / 1000 );
	const numMinutes = Math.floor( numSeconds / 60 );
	const numHours = Math.floor( numMinutes / 60 );
	const numDays = Math.floor( numHours / 24 );

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
						${tripInfo.weather}
					</div>
				</div>
			</div>
			<div class="tripNotesContainer">
				Notes
			</div>
		</div>`;

	document.querySelector( '#trips').insertAdjacentHTML( 'beforeend', tripDisplay );

	// Assign event listeners to the new trip buttons.
	let tripEntries = document.querySelectorAll( '.tripEntry' );
	const entryIndex = tripEntries.length - 1;
	const latestEntry = tripEntries[ entryIndex ];
	latestEntry.querySelector( '.tripAddNotesButton' ).addEventListener( 'click', () => { TravelApp.addNotes( entryIndex ); } );
	latestEntry.querySelector( '.saveTripButton' ).addEventListener( 'click', () => { TravelApp.saveTrip( entryIndex ); } );
	latestEntry.querySelector( '.removeTripButton' ).addEventListener( 'click', () => { TravelApp.removeTrip( entryIndex ); } );

};

const addTrip = ( event ) => {

	event.preventDefault(); // Prevent page refresh caused by form submission.
	
	const destInput = event.target[0].value; // Destination input.
	const dateInput = event.target[1].value; // Date input.

	if( !validDestination( destInput ) || !validDate( dateInput ) ) { return };
	
	// TODO - Send request to the server.
		// TODO - Report errors if they exist.

		// Add trip to app display.
		let tripInfo = { // Debug
			'destination': destInput,
			'date': dateInput,
			'weather': `High of 46C, Low of 32C
				<br>
				Sunny throughout the day.`
		}
		insertTrip( tripInfo );

		// TODO - Add trip to localStorage.
		//saveTrip( index );

};

const addNotes = ( index ) => {

	console.log( `addNotes(${index})` );

};

const saveTrip = ( index ) => {

	console.log( `saveTrip(${index})` );

};

const removeTrip = ( index ) => {

	console.log( `removeTrip(${index})` );

};

const assignEvents = () => {

	document.querySelector( '#tripForm' ).addEventListener( 'submit', addTrip );

};

export {
	insertTrip,
	addTrip,
	addNotes,
	saveTrip,
	removeTrip,
	assignEvents
};