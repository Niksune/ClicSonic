var Fight = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Fight() {
            Phaser.Scene.call(this, { key: 'Fight' });
        },

    preload: function () {
    },

    create: function () {

        console.log("pute-1")

        Fight = this.scene.get("Fight");

        this.score = 0;
        this.texte;
        this.perteAccelerationEvent;
        this.spriteSonic;
        this.bar;
        this.maxScore = levels.get(level).maxScore;
        this.dashSounds = [];
        this.end = false;

        manageMusic('puzzles');

        this.add.image(0, 0, 'fond' + level).setOrigin(0, 0);

        console.log("pute0")

        this.scenario();
    },

    scenario: function () {

        console.log("pute")

        this.compteurDialogue = 1;

        if (level === "Tails") {
            this.dialogue = new EcranDialogue("Salut Sonic !\nQuel Bon vent t'amène ?", this, "tails");
            this.dialogue.creerEtAfficher();
            this.dialogue.getZoneReaction().on('pointerdown', function (pointer) {
                switch (Fight.compteurDialogue) {
                    case 1:
                        Fight.dialogue.setDialogue("Je pense qu'il\nva y avoir de\nl'action aujourd'hui.", "sonic");
                        break;
                    case 2:
                        Fight.dialogue.setDialogue("J'aimerais que\nl'on soit prets.", "sonic");
                        break;                    
                    case 3:
                        Fight.dialogue.setDialogue("Très bien !\nJ'aurai juste besoin\nde ton aide pour\nfinir de réparer\nce partionneur\à émeraudes", "tails");
                        break;                    
                    case 4:
                        Fight.dialogue.setDialogue("C'est comme si\nc'était fait !", "sonic");
                        break;
                    case 5:
                        Fight.dialogue.fermer();
                        Fight.launchingFight();
                        break;
                }
                Fight.compteurDialogue++;
            });
        }
        else if (level === "Knuckles") {

        }

        
    
            


    },

    launchingFight: function () {

        console.log("pute2")

        this.add.sprite(400, 100, 'noir').setOrigin(0.5);

        this.texte = this.add.text(400, 100, 'Clic Sonic !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.bar = new HealthBar(this, 200, 200, 400, 50, this.maxScore);

        this.perteAccelerationEvent = this.time.addEvent({ delay: 1500, callback: this.perteAcceleration, callbackScope: this, loop: true });

        this.spriteSonic = this.add.sprite(400, 400, 'sonic').setOrigin(0.5).setInteractive();

        this.spriteSonic.on('pointerdown', function (pointer) {

            Fight.spriteSonic.setTexture("sonicSpin");

            //Premier clic
            if (Fight.dashSounds.length == 0) {
                Fight.finLevelEvent = Fight.time.addEvent({ delay: 2500, callback: Fight.finLevel, callbackScope: Fight, loop: false });
                music.stop();
                Fight.dashSounds[0] = Fight.sound.add('spinPrepare');
                Fight.dashSounds[0].play();
            }
            else if (Fight.dashSounds.length < 3) {
                Fight.dashSounds[Fight.dashSounds.length] = Fight.sound.add('spinPrepare');
                Fight.dashSounds[Fight.dashSounds.length - 1].play();
            }

            this.setTint(0xff0000);
            Fight.score += 10;
            Fight.majScore();
            if (Fight.score >= Fight.maxScore) {
                Fight.finLevel();
            }
        });

        this.spriteSonic.on('pointerout', function (pointer) {

            this.clearTint();

        });

        this.spriteSonic.on('pointerup', function (pointer) {

            this.clearTint();

        });


    },

    perteAcceleration: function () {
        this.score -= 30;
        if (this.score <= 0)
            this.score = 0;
        this.majScore();
    },

    majScore: function () {
        console.log("pute"+this.score);
        this.bar.newAmount(this.score);
    },

    finLevel: function () {
        this.finalDash = this.sound.add('spinDash');
        this.finalDash.play();

        if (this.score >= (this.maxScore / 2))
            this.end = "victoire";
        else
            this.end = "defaite";

        this.perteAccelerationEvent.remove();
        this.finLevelEvent = this.time.addEvent({ delay: 1000, callback: this.changeScene, callbackScope: this });
        if (this.end == "victoire")
            this.texte.setText('VICTOIRE');
        else
            this.texte.setText('ESSAYE ENCORE !');
        this.spriteSonic.off('pointerdown');
    },

    changeScene: function () {
        if (this.end == "victoire")
            levels.get(level).complete = true;

        Fight.scene.start('World');
    }
});