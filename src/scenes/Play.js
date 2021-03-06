class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        //Load sprites
        this.load.image('starfield', 'assets/sprites/Sea_BG1.png');
        this.load.image('starfield2', 'assets/sprites/Sea_BG2.png');
        this.load.image('starfield3', 'assets/sprites/Sea_BG3.png');
        this.load.image('UIButton', 'assets/sprites/UI 1.png');
        this.load.image('UIButton2', 'assets/sprites/UI 2.png');
        this.load.image('sand', 'assets/sprites/Sand.png');
        this.load.image('rocket', 'assets/sprites/Hook.png');
        //this.load.image('ship', 'assets/fish1.png');

        // load explosion spritesheet
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('ship', './assets/sprites/fish-Sheet.png', {frameWidth: 42, frameHeight: 38, startFrame: 0, endFrame: 1});
        this.load.spritesheet('crab', './assets/sprites/crab-Sheet.png', {frameWidth: 60, frameHeight: 58, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bubble', './assets/sprites/test2.png', {frameWidth: 54, frameHeight: 54, startFrame: 0, endFrame: 2});
    }

    create() {
        //Add BG
        this.starfield3 = this.add.tileSprite(
            0,0,640,480, 'starfield3'
        ).setOrigin(0,0);

        //Add BG
        this.starfield2 = this.add.tileSprite(
            0,0,640,480, 'starfield2'
        ).setOrigin(0,0);

        //Add BG
        this.starfield1 = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);
        
        this.sand = this.add.tileSprite(
            0,-30,640,480, 'sand'
        ).setOrigin(0,0);

        //Create player object
        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            borderUISize*4,
            'rocket',
            10
        ).setOrigin(0.5, 0);

        //Create ship objects
        this.ship1 = new Ship(
            this,
            game.config.width + borderUISize*6,
            borderUISize*6 + borderPadding*3,
            'ship',
            0,
            10,
            1
        ).setOrigin(0,0);

        this.ship2 = new Ship(
            this,
            game.config.width + borderUISize * 3,
            borderUISize*7.5,
            'ship',
            0,
            20,
            1.2
        ).setOrigin(0,0);

        this.ship3 = new Ship(
            this,
            game.config.width,
            borderUISize*9,
            'ship',
            0,
            30,
            1.5
        ).setOrigin(0,0);

        this.crab = new Ship(
            this,
            game.config.width,
            borderUISize*10 + borderPadding*4,
            'crab',
            0,
            50,
            2
        ).setOrigin(0,0);

        // UI Background
        this.add.rectangle(
            0,
            borderUISize,
            game.config.width,
            borderUISize * 2,
            0x27528a,
            ).setOrigin(0,0);

        //Borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0x4290f5).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x4290f5).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0x4290f5).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x4290f5).setOrigin(0 ,0);

        //Instantiate input keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      

        //Animation config//
        this.anims.create({
            key: 'bubblePop',
            frames: this.anims.generateFrameNumbers('bubble', {start: 0, end: 2, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'fishSwim',
            frames: this.anims.generateFrameNumbers('ship', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'crabWalk',
            frames: this.anims.generateFrameNumbers('crab', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        //Enemy Animations//
        this.ship1.anims.play('fishSwim');
        this.ship2.anims.play('fishSwim');
        this.ship3.anims.play('fishSwim');
        this.crab.anims.play('crabWalk');


        //Initialize the score
        this.p1Score = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#4290f5',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }
        this.UIButton = this.add.tileSprite(
            55,35,0,0, 'UIButton'
        ).setOrigin(0,0);

        this.UIButton2 = this.add.tileSprite(
            300,35,0,0, 'UIButton2'
        ).setOrigin(0,0);


        this.scoreLeft = this.add.text(65, 50, this.p1Score, scoreConfig);

        //Game Over flag
        this.gameOver = false;
        
        //Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.timer = this.add.text(320,58);

        //Display Timer
        /*this.timer = {
            fontFamily: 'Oranienbaum',
            fontSize: '28px',
            backgroundColor: '#4290f5',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }*/

        //this.timer = this.add.text((borderUISize + borderPadding) *6, borderUISize + borderPadding*2, 
        //"Time: " + this.clock.getProgress().toString(), timer);
    }

    update() {
        //Timer
        //this.timer.setText("Time: " + this.clock.getElapsedSeconds().toString().substr(0, 4));
        this.timer.setText("Time: " + ((game.settings.gameTimer - this.clock.getElapsed())/1000).toString().substr(0, 4)); 
        //If game over, check input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        //Go back to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    

        //Call update on each object
        this.starfield1.tilePositionX -= 3;
        this.starfield2.tilePositionX -= 2;
        if (!this.gameOver)
        {
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.crab.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);       
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);       
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);       
        }
        if (this.checkCollision(this.p1Rocket, this.crab)) {
            this.p1Rocket.reset();
            this.shipExplode(this.crab);       
        }
    }

    checkCollision(rocket, ship)
    {
        //Check box collision of rocket and ship
        if  (rocket.x > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y > ship.y &&
            rocket.y < ship.y + ship.height)
            {
                return true;
            }
            else
            {
                return false;
            }
    }

    shipExplode(ship) {
        //Hide ship
        ship.alpha = 0;

        //Create explosion animation on ship's location
        let boom = this.add.sprite(ship.x, ship.y, 'bubble').setOrigin(0, 0);
        boom.anims.play('bubblePop');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite

            //Score add
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        });       

        this.sound.play('sfx_explosion');
      }
}