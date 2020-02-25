const validDestination = ( destination ) => {

	let valid = false;

	// TODO: validation code

	return valid;

}

const validDate = ( date ) => {

	let valid = false;
	let currentDate = new Date();
	const dateRegExp = /^(0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/; // Date format mm/dd/yyyy.
	
	if( dateRegExp.test( date ) ){

		// TODO: validation code

		valid = true;

	}else{

		alert( 'Please enter a valid date format.' );

	}

	return valid;

}