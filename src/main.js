let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    fps: {
        target: 120,
        forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;