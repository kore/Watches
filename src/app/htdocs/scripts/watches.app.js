/**
 * Basic application dispatching configuration
 *
 * Licensed under AGPL3
 */
(function( global ) {

    var App = function() {
        var app = this;

        $( '#content' ).templating();
        $( window ).watches();
        $( '.navbar' ).markCurrent( {
            "main":     "nav-home",
            "create":   "nav-create"
        } );

        // General content handling
        $( window ).bind( "contentLoaded", function ( e, target ) {
            $( target ).find( "a" ).not( "[href^=\"http\"]" ).bind( "click", function() {
                History.pushState( null, null, $(this).attr( "href" ) );
                return false;
            } );
        } );

        $( window ).bind( "route", app.initAppBase );

        $( window ).bind( "route:404", app.showNotFound );
        $( window ).bind( "route:main", app.initMain );
        $( window ).bind( "route:create", app.initCreate );
    };

    /**
     * Initialize general application configuration
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initAppBase = function( event, request ) {

        // Reset all singals on "startup"
        $( $.fn.dispatch.sources ).unbind( ".dispatcher" );
        $.fn.dispatch.sources = [];

        // Mark current selected tab as selected
        $( '.navbar' ).trigger( "markCurrentLink", [request.matched] );

        // Show application initilization screen
        $( '#content' ).trigger( 'updateContents', [{template: 'initialize.mustache' }] );
    };

    /**
     * Show not found result for unmatched routes
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.showNotFound = function( event, request ) {
        $( '#content' ).trigger( 'updateContents', [{template: "404.mustache"}] );
    };

    /**
     * Initialize main tweet view of application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initMain = function( event, request ) {
        // @TODO: Implement show main.
    };

    /**
     * Initialize accounts view of the application
     *
     * @param Event event
     * @param Request request
     */
    App.prototype.initCreate = function( event, request ) {
        $( '#content' ).trigger( 'updateContents', [{template: "watch-create.mustache"}] );
    };

    // Exports
    global.Watches = global.Watches || {};
    global.Watches.App = App;

})(this);