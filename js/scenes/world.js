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

        manageMusic('worldMenu');

        this.worldBackground = this.add.sprite(0, 0, 'fondWorld').setOrigin(0, 0);
        this.spriteTails = this.add.sprite(600, 400, 'tails').setOrigin(0.5).setInteractive();
        this.spriteKnuckles = this.add.sprite(200, 400, 'knuckles').setOrigin(0.5).setInteractive();

        //Ajout du texte si pas encore au niveau final
        if(levels.get("Knuckles").complete === false)
        {
            this.fondTexte = this.add.sprite(400, 100, 'noir').setOrigin(0.5);

            this.texte = this.add.text(400, 100, 'Rallie tes amis !', { fontSize: '27px', fill: '#fff' }).setOrigin(0.5);    
        }

        //Gestion sprite et action Tails
        if (levels.get("Tails").complete === false) {
            this.spriteTails.on('pointerdown', function (pointer) {

                level = "Tails";

                World.scene.start('Fight');
            });
        }
        else {
            this.spriteTails.setTexture("thumbUpTails");
        }

        //Gestion sprite et action knuckles
        if (levels.get("Tails").complete === true && levels.get("Knuckles").complete === false) {
            this.spriteKnuckles.clearTint();
            this.spriteKnuckles.on('pointerdown', function (pointer) {

                level = "Knuckles";
    
                World.scene.start('Fight');
            });
        }
        else if(levels.get("Tails").complete === false)
        {
            this.spriteKnuckles.setTint(0x696969);
        }
        else
        {
            this.spriteKnuckles.setTexture("thumbUpKnuckles");
        }

        //Gestion apparition niveau final
        if(levels.get("Knuckles").complete === true)
        {
            this.timedEvent = this.time.addEvent({ delay: 2500, callback: this.afterAnim, callbackScope: this, loop: false });
            this.finalAnim();
        }

        /*TEST ANIM*/
        this.bouton = this.add.sprite(400, 200, 'boutonTestAnim').setOrigin(0.5).setInteractive();
        this.bouton.on('pointerdown', function (pointer) {
            World.finalAnim();
        });
        /*FIN*/
        
    },

    finalAnim: function () {

        this.fondTexte.destroy();
        this.texte.destroy();
        this.fondSombre(1);

        console.log("Animation Finale");

        //TODO :
        //Mettre les 2 nuages et leur mettre une velocity
        //Mettre le sprite de metalsonic derrière
        //Lancer le son de ça bouge
    },

    fondSombre: function (occurence) {

        console.log("occurence :"+occurence);
        color = 0;

        switch(occurence)
        {
            case 1 :
                color = 0xFFCACA;
                break;
            case 2 :
                color = 0xFFACAC;
                break;
            case 3 :
                color = 0xFF5C5C;
                break;
            case 4 :
                color = 0xFF0000;
                break;

        }
        
        this.worldBackground.setTint(color);

        if(occurence < 4)
            this.time.addEvent({ delay: 500, callback: function(){this.fondSombre(++occurence)}, callbackScope: this });

    },

    afterAnim: function () {
        //TODO :
        //Arréter le son de ça bouge
        //Arréter la velocity des nuages
        //Son de "glong"
        //Rendre niveau metal sonic clickable qui lance la nouvelle scene LastLevel
    }
});