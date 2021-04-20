/*
// Created by Niklas Thomas
// 
//////// POINT BREAKDOWN ////////
// 60: Redesign the Game's Theme (60)
// 20: New Spaceship Type (20)
// 20: Clock Time Mechanism (20) 
// TOTAL: 100 pts
//
// Sources: https://phaser.discourse.group/t/is-there-fixedupdate-like-unity-in-phaser/5953
//          https://freesound.org/people/qubodup/sounds/60013/
*/

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