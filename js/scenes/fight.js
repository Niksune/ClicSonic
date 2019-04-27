var levels = [
    new Level("Tails", 50),
    new Level("Knuckles", 100)
];

function getLevel() {
    var levelToReturn = "Level Inconnu";
    levels.forEach(function (element) {
        if (element.name == level) {
            levelToReturn = element;
        }
    });
    return levelToReturn;
}

var Fight = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Fight() {
            Phaser.Scene.call(this, { key: 'Fight' });
        },

    preload: function () {
    },

    create: function () {

        this.levelInstance = getLevel();
        this.score = 0;
        this.texte;
        this.timedEvent;
        this.spriteSonic;
        this.bar;
        this.maxScore = this.levelInstance.maxScore;

        Fight = this.scene.get("Fight");

        this.add.image(0, 0, 'fond' + level).setOrigin(0, 0);

        this.texte = this.add.text(400, 100, 'Clic Sonic !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.bar = new HealthBar(this, 300, 200, 200, 50, this.maxScore);

        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.onEvent, callbackScope: this, loop: true });

        this.spriteSonic = this.add.sprite(400, 400, 'sonic').setOrigin(0.5).setInteractive();

        this.spriteSonic.on('pointerdown', function (pointer) {

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
        console.log("victoire niveau "+level);

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