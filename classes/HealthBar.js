class HealthBar {

    constructor(scene, x, y, longueurMax, hauteurMax, valeurMax) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.largeurBordure = 10;

        this.x = x;
        this.y = y;
        this.value = 0;
        this.longueurMax = longueurMax;
        this.hauteurMax = hauteurMax;

        //Pour gérer la bordure
        this.longueur = longueurMax - this.largeurBordure*2;
        this.hauteur = hauteurMax - this.largeurBordure*2;

        this.valeurMax = valeurMax;

        this.draw();

        scene.add.existing(this.bar);
    }

    newAmount(amount) {
        this.value = amount;

        this.draw();
    }

    draw() {
        this.bar.clear();

        //Bordure
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.longueurMax, this.hauteurMax);

        //Fond Barre
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + this.largeurBordure, this.y + this.largeurBordure, this.longueur, this.hauteur);

        if (this.value / this.valeurMax < 0.3) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var longueurEffective = Math.floor(this.longueur * this.value / this.valeurMax);

        this.bar.fillRect(this.x + this.largeurBordure, this.y + this.largeurBordure, longueurEffective, this.hauteur);
    }

}

//de base longueur = 76 et hauteur = 12
/*
decrease(amount)
{
    this.value -= amount;

    if (this.value < 0) {
        this.value = 0;
    }

    this.draw();

    return (this.value === 0);
}
*/