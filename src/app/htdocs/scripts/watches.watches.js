/**
 * Watch handling
 *
 * Licensed under AGPL3
 */
;( function( $ ) {
    $.fn.watches = function()
    {
        var list;

        list = function( e, data )
        {
            // @TODO: Implement
        };

        return this.each( function()
        {
            $(this).bind( "listWatches", list );
        } );
    };
}( jQuery ) );
