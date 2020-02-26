const app = require('./server.js');

// Setup server port and apply listener
const port = 8080;
app.listen( port, () => {

	console.log( `Travel app is listening on port ${port}.` );

});