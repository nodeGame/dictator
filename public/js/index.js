/**
 * # Index script for nodeGame
 * Copyright(c) 2017 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://nodegame.org
 * ---
 */
window.onload = function() {
    if ('undefined' === typeof node) {
        throw new Error('node is not loaded. Aborting.');
    }

    // All these properties will be overwritten
    // by remoteSetup from server.
    node.setup('nodegame', {
        verbosity: 0,
        debug: true,
        window: {
            promptOnleave: false
        },
        events: {
            dumpEvents : false
        },
        socket : {
            type : 'SocketIo',
            reconnection : false
        }
    });

    // Connect to channel.
    node.connect();
};
