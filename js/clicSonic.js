//Global Variables
//The Scenes + this file
var fromInit = true;

var level;

var levels = new Map();

levels.set("Tails",new Level("Tails", 150));
levels.set("Knuckles",new Level("Knuckles", 330));

var music;

function manageMusic(musicName)
{
    music.stop();
    music = Init.sound.add(musicName);
    music.play();
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        Init,
        World,
        Fight/*,
        LastLevel*/
    ]
};
var game = new Phaser.Game(config);




