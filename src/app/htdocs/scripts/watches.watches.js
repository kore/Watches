/**
 * Watch handling
 *
 * Licensed under AGPL3
 */
;( function( $ ) {
    $.fn.watches = function()
    {
        var list, load, create, update;

        list = function( e, data )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/watches?include_docs=true",
                function( watches, textStatus, request ) {
                    $( e.target ).trigger( "listWatches", [watches] );
                }
            );
        };

        load = function( e, data )
        {
            Lounge.utils.queryApi(
                "/" + data,
                function( watch, textStatus, request ) {
                    $( e.target ).trigger( "showWatch", [watch] );
                }
            );
        };

        create = function( e, data )
        {
            var now = new Date(),
                watch = {
                    type:      "watch",
                    edited:    now.getTime(),
                    number:    parseInt( data.number, 10 ),
                    value:     parseInt( data.value, 10 ),
                    material:  data.material,
                    features:  data.features,
                    gravure:   data.gravure,
                    hinged:    data.hinged ? true : false,
                    precision: data.precision,
                    producer:  data.producer,
                    build:     parseInt( data.build, 10 )
                };

            // Submit watch to database
            Lounge.utils.queryApi(
                "/",
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "watchUpdated" );
                },
                JSON.stringify( watch ),
                "POST"
            );
        };

        update = function( e, data )
        {
            var now = new Date(),
                watch = {
                    type:      "watch",
                    edited:    now.getTime(),
                    _rev:      data._rev,
                    number:    parseInt( data.number, 10 ),
                    value:     parseInt( data.value, 10 ),
                    material:  data.material,
                    features:  data.features,
                    gravure:   data.gravure,
                    hinged:    data.hinged ? true : false,
                    precision: data.precision,
                    producer:  data.producer,
                    build:     parseInt( data.build, 10 )
                };

            // Submit watch to database
            Lounge.utils.queryApi(
                "/" + data._id,
                function( data, textStatus, request ) {
                    $( e.target ).trigger( "watchUpdated" );
                },
                JSON.stringify( watch ),
                "PUT"
            );
        };

        return this.each( function()
        {
            $(this).bind( "watchList", list );
            $(this).bind( "watchCreate", create );
            $(this).bind( "watchLoad", load );
            $(this).bind( "watchUpdate", update );
        } );
    };
}( jQuery ) );
