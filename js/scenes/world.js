var World = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function World() {
            Phaser.Scene.call(this, { key: 'World' });
        },

    preload: function () {
    },

    create: function () {

        World = this.scene.get("World");

        this.spriteTails;
        this.spriteKnuckles;

        this.add.image(0, 0, 'fondWorld').setOrigin(0, 0);
        this.spriteTails = this.add.sprite(600, 400, 'tails').setOrigin(0.5).setInteractive();
        this.spriteKnuckles = this.add.sprite(200, 400, 'knuckles').setOrigin(0.5).setInteractive();

        this.spriteTails.on('pointerdown', function (pointer) {

            level = "Tails";

            World.scene.start('Fight');
        });

        this.spriteKnuckles.on('pointerdown', function (pointer) {

            level = "Knuckles";

            World.scene.start('Fight');
        });


        
    }
});