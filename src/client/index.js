/* Import JS functions */
import { validDestination, validDate } from './js/inputValidation';
import { addTrip } from './js/travel-app';


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
	addTrip
}