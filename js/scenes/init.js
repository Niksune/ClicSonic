//Global Variables
//The Scenes
var level = " ";

var Init = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Init() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        this.load.image('sonic', 'images/sonicIcon.png');
        this.load.image('tails', 'images/tailsIcon.png');
        this.load.image('knuckles', 'images/knucklesIcon.png');
        this.load.image('fondWorld', 'images/fondWorld.jpg');
        this.load.image('fondKnuckles', 'images/masterEmerald.png');
        this.load.image('fondTails', 'images/tailsWorking.jpg');
    },

    create: function () {
        this.scene.start('World');
    }
});