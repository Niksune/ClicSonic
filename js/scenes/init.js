//Only global variables : The Scenes

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
        this.load.image('fondFight', 'images/fondFight.jpg');
        this.load.image('fondWorld', 'images/fondWorld.jpg');
    },

    create: function () {
        this.scene.start('World');
    }
});