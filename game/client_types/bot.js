/**
 * # Bot type.
 * Copyright(c) 2018 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */
const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom, node) {

    let channel = gameRoom.channel;
    let logic = gameRoom.node;

    stager.setDefaultCallback(function() {
        node.timer.random.done();
    });

    stager.extendStep('game', {
        roles: {
            OBSERVER: {
                cb: function() {
                    node.timer.random.done();
                }
            },
            DICTATOR: {
                cb: function() {
                    node.on('PLAYING', function() {
                        node.timer.random.done({
                            offer: J.randomInt(-1,100)
                        });
                    });
                }
            }
        }
    });
};
