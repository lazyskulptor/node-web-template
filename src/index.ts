import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.SERVER_PORT; // default port to listen
const app : express.Application = express();


app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req : express.Request, res : express.Response ) : void => {
    res.render( "index" );
} );

// start the Express server
app.listen( port, () : void => {
    console.info( `server started at http://localhost:${ port }` );
} );