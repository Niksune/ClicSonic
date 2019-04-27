var Fight = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function BootScene() {
            Phaser.Scene.call(this, { key: 'Fight' });
        },

    preload: function () {
        this.load.image('sonic', 'images/sonicIcon.png');
        this.load.image('fond', 'images/fond.jpg');
    },

    create: function () {

        this.score = 0;
        this.texte;
        this.timedEvent;
        this.sprite;
        this.bar;
        this.maxScore = 500;

        Fight = this.scene.get("Fight");
        this.add.image(0, 0, 'fond').setOrigin(0, 0);

        this.texte = this.add.text(400, 100, 'Clic Sonic !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.bar = new HealthBar(this, 300, 200, 200, 50, this.maxScore);

        this.sprite = this.add.sprite(400, 400, 'sonic').setOrigin(0.5).setInteractive();

        this.sprite.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);
            Fight.score += 10;
            Fight.majScore();
        });

        this.sprite.on('pointerout', function (pointer) {

            this.clearTint();

        });

        this.sprite.on('pointerup', function (pointer) {

            this.clearTint();

        });

        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.onEvent, callbackScope: this, loop: true });
    },

    update: function () {

        if (this.score >= this.maxScore) {
            this.timedEvent.remove();

            this.texte.setText('VICTOIRE');

            this.sprite.off('pointerdown');
        }
    },

    onEvent: function () {
        this.score -= 50;
        if (this.score <= 0)
            this.score = 0;
        this.majScore();
    },

    majScore: function () {
        console.log(this.score);
        this.bar.newAmount(this.score);
    }
});