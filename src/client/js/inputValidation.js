const validDestination = ( destination ) => {

	let valid = false;

	// TODO: validation code

	return valid;

}

const validDate = ( date ) => {

	let valid = false;
	const dateRegExp = /^(0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/; // Date format mm/dd/yyyy.
	
	if( dateRegExp.test( date ) ){ // Check for proper date format.

		let currentDate = new Date();

		// Create date object with user input.
		const dateArray = date.split( '/' );
		let requestDate = new Date( parseInt( dateArray[2] ), parseInt( dateArray[0] ), parseInt( dateArray[1] ) );

		if( ( requestDate - currentDate ) > 0 ){

			valid = true;

		}else{

			alert( 'Please enter a date that is in the future.' );

		}

	}else{

		alert( 'Please enter a valid date format.' );

	}

	return valid;

}

export{
	validDestination,
	validDate
}