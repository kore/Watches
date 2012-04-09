/**
 * Watch handling
 *
 * Licensed under AGPL3
 */
;( function( $ ) {
    $.fn.watches = function()
    {
        var list, create;

        list = function( e, data )
        {
            Lounge.utils.queryApi(
                "/_design/app/_view/watches?include_docs=true",
                function( watches, textStatus, request ) {
                    $( e.target ).trigger( "listWatches", [watches] );
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
                    $( e.target ).trigger( "watchList" );
                },
                JSON.stringify( watch ),
                "POST"
            );
        };

        return this.each( function()
        {
            $(this).bind( "watchList", list );
            $(this).bind( "watchCreate", create );
        } );
    };
}( jQuery ) );
