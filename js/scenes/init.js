//Only global variables : The Scenes

var Init = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Init() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        this.load.image('sonic', 'images/sonicIcon.png');
        this.load.image('fond', 'images/fond.jpg');
    },

    create: function () {
        this.scene.start('World');
    }
});