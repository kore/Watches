function ( doc ) {
    if ( doc.type === "watch" ) {
        emit( doc.number, null );
    }
}
