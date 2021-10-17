const { stdout, stdin } = process;

stdin.on( "data", data => {
    const text = data.toString( "utf8" ).trim();
    const reverseString = text
        .split( "" )
        .reverse()
        .join( "" );
    const answer = `${ reverseString }\n\n\n`;
    stdout.write( answer );
});
