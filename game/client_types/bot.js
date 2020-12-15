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

    stager.extendAllSteps(function(o) {
        o.cb = function() {
            let stepObj = this.getCurrentStepObj();
            let id = stepObj.id;

            node.timer.random(2000).done();
        };
        return o;
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
                        node.timer.random.exec(function() {
                            node.done({
                                offer: J.randomInt(-1,100)
                            });
                        });
                    });
                }
            }
        }
    });
};
