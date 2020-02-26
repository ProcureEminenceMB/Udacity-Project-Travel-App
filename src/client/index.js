/* Import JS functions */
import { validDestination, validDate } from './js/inputValidation';
import { insertTrip, getGeoCoords, getForecast, getImage, addTrip, addNotes, saveTrip, removeTrip, assignEvents } from './js/travel-app';

// IIFE for event listener assignments.
( () => {
	document.addEventListener( 'DOMContentLoaded', assignEvents );
})();

/* Import SCSS styles */
import './styles/reset.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/trip-entry.scss';
import './styles/form.scss';

/* Export JS functions */
export {
	validDestination,
	validDate,
	insertTrip,
	getGeoCoords,
	getForecast,
	getImage,
	addTrip,
	addNotes,
	saveTrip,
	removeTrip
}