/*
// Created by Niklas Thomas
// 
//////// POINT BREAKDOWN ////////
// Redesign the Game's Theme (60)
// New Spaceship Type (20)
// Parallax Scrolling (10)
// Timer Display (10)
// TOTAL: 100 pts
//
// Sources: https://phaser.discourse.group/t/is-there-fixedupdate-like-unity-in-phaser/5953
//          https://freesound.org/people/qubodup/sounds/60013/
//          https://freesound.org/people/Glaneur%20de%20sons/sounds/104945/
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    /*fps: {
        target: 60,
        forceSetTimeOut: true
    }*/
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;