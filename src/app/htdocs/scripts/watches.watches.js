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
            var watch = data,
                now = new Date();

            watch.edited = now.getTime();
            watch.type   = "watch";

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
