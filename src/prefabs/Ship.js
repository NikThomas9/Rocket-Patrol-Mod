class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedModifier) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed * speedModifier;
    }

    update() {
        this.x -= this.moveSpeed;

        if (this.x < -this.width)
        {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}