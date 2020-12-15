/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2017 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const stepRules = ngc.stepRules;
const constants = ngc.constants;
const J = ngc.JSUS;
let counter = 0;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel =  gameRoom.channel;

    // Increment counter.
    counter = counter ? ++counter : settings.SESSION_ID || 1;

    stager.setOnInit(function() {
        // Initialize the client.
    });

    stager.extendStep('game', {
        matcher: {
            roles: [ 'DICTATOR', 'OBSERVER' ],
            match: 'round_robin',
            cycle: 'mirror_invert',
            sayPartner: false
            // skipBye: false,

        },
        cb: function() {
            node.once.data('done', function(msg) {
                 var offer, observer;
                 offer = msg.data.offer;

                // Validate incoming offer.
                if (false === J.isInt(offer, 0, 100)) {
                    console.log('Invalid offer received from ' + msg.from);
                    // If dictator is cheating re-set his/her offer.
                    msg.data.offer = settings.defaultOffer;
                    // Mark the item as manipulated.
                    msg.data.originalOffer = offer;
                }

                 observer = node.game.matcher.getMatchFor(msg.from);
                // Send the decision to the other player.
                node.say('decision', observer, msg.data.offer);

            });
            console.log('Game round: ' + node.player.stage.round);
        }
    });

    stager.extendStep('end', {
        cb: function() {
            node.game.memory.save('data_' + node.nodename + '.json');
        }
    });

    // Here we group together the definition of the game logic.
    return {
        nodename: 'lgc' + counter,
        // Extracts, and compacts the game plot that we defined above.
        plot: stager.getState()
    };

};
