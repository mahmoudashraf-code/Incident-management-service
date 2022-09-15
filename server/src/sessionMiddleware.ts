import * as session from "express-session";
var FileStore = require('session-file-store')(session);

export default session({
    store: new FileStore({ logFn: () => { }, reapInterval: 60 * 60 * 24 * 30 }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
});
