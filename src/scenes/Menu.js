class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/bloop.wav');
        this.load.audio('sfx_rocket', './assets/hook_cast.wav');

        this.load.image('bg', 'assets/Sea_BG3.png');
    }

    create() {
          //Add BG
          this.bg = this.add.tileSprite(
            0,0,640,480, 'bg'
        ).setOrigin(0,0);
        
        //Menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#4290f5',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
        borderPadding, 'Fishing Frenzy!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2, 'Use ← → to move & F to cast your', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#27528a';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);   
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}