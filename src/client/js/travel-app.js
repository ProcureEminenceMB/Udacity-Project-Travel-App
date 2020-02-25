import { validDestination, validDate } from './inputValidation';

const insertTripDisplay = () => {

	// TODO - Create individual trip display via template literal.

	// TODO - Update template literal content and add to app display.

	// TODO - Assign event listeners to trip buttons.

};

const addTrip = ( event ) => {

	event.preventDefault(); // Prevent page refresh caused by form submission.

}

const assignEvents = () => {

	document.querySelector( '#tripForm' ).addEventListener( 'submit', addTrip );

};

export {
	insertTripDisplay,
	addTrip,
	assignEvents
}