# cmdv.io
a pastebin service with revisions.

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
* Finish syntax detection and highlighting (90%)
* Keyboard shortcuts (for actions and text editing-- like making `tab` work properly)
* Enable the clone/new buttons
* Make it isomorphic - with this comes functionality even when JS is disabled, and faster pageloads
* Queryparams for highlighting lines or slices of a paste when sharing
* CSS tweaks
