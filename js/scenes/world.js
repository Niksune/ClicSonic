var World = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function World() {
            Phaser.Scene.call(this, { key: 'World' });
        },

    preload: function () {
    },

    create: function () {
        this.scene.start('Fight');
    }
});