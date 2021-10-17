const { createReadStream, createWriteStream } = require( "fs" );
const { join } = require( "path" );
const csv = require( "csvtojson" );
const { pipeline } = require( "stream" );

const csvPath = join( __dirname, "./csv/file.csv" );
const txtPath = join( __dirname, "./txt/file.txt" );

const readStream = createReadStream( csvPath );
const writeStream = createWriteStream( txtPath );

const config = {
    ignoreColumns: /amount/,
    colParser: { price: "number" }
}

function logger( err ) {
    if ( err ) {
        console.error( err );
    }
};

function changedNameColumn( fileLineString, lineIdx ) {
    if ( lineIdx === 0 ) {
        return fileLineString.toLowerCase();
    }
    return fileLineString;
}

pipeline(
    readStream,
    csv( config ).preFileLine( changedNameColumn ),
    writeStream,
    logger
);
