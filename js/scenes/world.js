/*
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
		update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var texte;
var timedEvent;
var sprite;
var bar;
var maxScore = 500;

function preload ()
{
    this.load.image('sonic', 'images/sonicIcon.png');
	this.load.image('fond', 'images/fond.jpg');
}

function create ()
{
	this.add.image(0, 0, 'fond').setOrigin(0, 0);
    
    texte = this.add.text(400, 100, 'Clic Sonic !', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
	
	bar = new HealthBar(this, 300, 200, 200, 50, maxScore);
	
    sprite = this.add.sprite(400, 400, 'sonic').setOrigin(0.5).setInteractive();

    sprite.on('pointerdown', function (pointer) {

        this.setTint(0xff0000);
		score += 10;
		majScore();
    });

    sprite.on('pointerout', function (pointer) {

        this.clearTint();

    });

    sprite.on('pointerup', function (pointer) {

        this.clearTint();

    });
	
	timedEvent = this.time.addEvent({ delay: 1500, callback: onEvent, callbackScope: this, loop: true });
}

function update ()
{
	
	if(score >= maxScore)
	{
        timedEvent.remove();
        
        texte.setText('VICTOIRE');
		
		sprite.off('pointerdown');
	}
}

function onEvent()
{
    score -= 50;
	if(score <=0)
		score = 0;
	majScore();
}

function majScore()
{
	console.log(score);
	bar.newAmount(score);
}

*/