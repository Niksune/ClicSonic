var Fight = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Fight() {
            Phaser.Scene.call(this, { key: 'Fight' });
        },

    preload: function () {
    },

    create: function () {

        this.score = 0;
        this.texte;
        this.timedEvent;
        this.spriteSonic;
        this.bar;
        this.maxScore = levels.get(level).maxScore;
        this.dashSounds = [];

        Fight = this.scene.get("Fight");

        manageMusic('puzzles');

        this.add.image(0, 0, 'fond' + level).setOrigin(0, 0);

        this.add.sprite(400, 100, 'noir').setOrigin(0.5);

        this.texte = this.add.text(400, 100, 'Clic Sonic !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.bar = new HealthBar(this, 300, 200, 200, 50, this.maxScore);

        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.onEvent, callbackScope: this, loop: true });

        this.spriteSonic = this.add.sprite(400, 400, 'sonic').setOrigin(0.5).setInteractive();

        this.spriteSonic.on('pointerdown', function (pointer) {

            Fight.spriteSonic.setTexture("sonicSpin");

            if(Fight.dashSounds.length == 0)
            {
                music.stop();
                Fight.dashSounds[0] = Fight.sound.add('spinPrepare');
                Fight.dashSounds[0].play();
            }
            else if(Fight.dashSounds.length < 3)
            {
                Fight.dashSounds[Fight.dashSounds.length] = Fight.sound.add('spinPrepare');
                Fight.dashSounds[Fight.dashSounds.length-1].play();
            }

            this.setTint(0xff0000);
            Fight.score += 10;
            Fight.majScore();
            if (Fight.score >= Fight.maxScore) {
                Fight.timedEvent.remove();
                Fight.timedEvent = Fight.time.addEvent({ delay: 1000, callback: Fight.victory, callbackScope: this });

                Fight.texte.setText('VICTOIRE');

                Fight.spriteSonic.off('pointerdown');
            }
        });

        this.spriteSonic.on('pointerout', function (pointer) {

            this.clearTint();

        });

        this.spriteSonic.on('pointerup', function (pointer) {

            this.clearTint();

        });


    },

    victory: function () {

        levels.get(level).complete = true;

        Fight.scene.start('World');
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