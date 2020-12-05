/**
 * # Bot type.
 * Copyright(c) 2018 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */
var ngc = require('nodegame-client');
var J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var channel = gameRoom.channel;
    var logic = gameRoom.node;

    stager.extendAllSteps(function(o) {
        o.cb = function() {
            var node, stepObj, id;
            stepObj = this.getCurrentStepObj();
            id = stepObj.id;
            node = this.node;

            node.timer.random(2000).done();
        };
        return o;
    });

    stager.extendStep('game', {
        roles: {
            OBSERVER: {
                cb: function() {
                    this.node.timer.random.done();
                }
            },
            DICTATOR: {
                cb: function() {
                    var node = this.node;
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
