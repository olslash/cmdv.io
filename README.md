# cmdv.io
A revision-tracking pastebin service.

####Tech:
* Node(io.js)/Express
* React/Flux
* MongoDB/Mongoose
* ImmutableJS
* Stylus

![cmdv.io]
(http://i.imgur.com/o3DiOaK.png)

### Running the tests

> npm intall

Edit `__tests__/test_server_config.js` with your db credentials, if needed.

> npm test

Tests run by default on port 9000; make sure nothing else is using that port, or the tests will fail.

### Running locally

> cp server\_config.sample.js server_config.js

> cp frontend\_config.sample.js frontend_config.js

Install and run mongodb. If you use a non-default port or add user credentials, edit the server config file with the correct settings.

> npm install

> npm run build

> npm start

You should see `app is listening on 8000`

The server will run at `http://locahost:8000` by default.

### Features in progress
* Final bugfixes related to highlighting
* Keyboard shortcuts (for actions and text editing-- like making `tab` work properly)
* Enable the clone/new buttons
* Make it isomorphic - with this comes functionality even when JS is disabled, and faster pageloads
* Queryparams for highlighting lines or slices of a paste when sharing
* CSS tweaks
