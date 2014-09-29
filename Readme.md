ClientDemo
==========

# Setup
Run `npm install`

# Start the app

 * Copy the file .env.example to .env
 * Fill in the two variables you've received from Telenor MVNO (X-TELENOR-KEY and CLIENT-ID) into .env
 * Run `npm start`
 * The app will start and the console will display the port the app has started on.
 * Browse to http://localhost:{PORT}, where PORT is displayed in the prev step

The app will now perform requests to a Client.Api located at http://localhost:3000 (for now).

# Run tests
 * Run `npm test`
