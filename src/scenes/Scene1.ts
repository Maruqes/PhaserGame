import * as MainLogic from "../logic/MainLogic";

export class Player {
    public x: number;
    public y: number;
    public speed: number;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move(direction: string, deltaTime: number) {
        switch (direction) {
            case 'up':
                this.y -= this.speed * deltaTime;
                break;
            case 'down':
                this.y += this.speed * deltaTime;
                break;
            case 'left':
                this.x -= this.speed * deltaTime;
                break;
            case 'right':
                this.x += this.speed * deltaTime;
                break;
        }
    }
}

export class Scene1 extends Phaser.Scene {

    public static readonly MAP_WIDTH = 100; // Reduced for better performance
    public static readonly MAP_HEIGHT = 100; // Reduced for better performance
    public static readonly BLOCK_SIZE = 32; // Smaller blocks for better view
    public static readonly MIDDLE_X_VECTOR = Scene1.MAP_WIDTH / 2;
    public static readonly MIDDLE_Y_VECTOR = Scene1.MAP_HEIGHT / 2;

    private blocks: MainLogic.Block[][] = [];
    private needsRedraw: boolean = true;
    private blockSprites: (Phaser.GameObjects.Image | null)[][] = [];

    private startX: number = 0;
    private startY: number = 0;

    private player: Player = new Player(0, 0, 5); // Initialize player with position and speed
    private cursors: any; // Store cursors to avoid recreating every frame

    constructor() {
        super({ key: 'Scene1' });
    }

    preload() {
        this.load.image('concrete', 'textures/Concrete/Concrete_01_Blue_1.png');
        this.load.image('grass', 'textures/Grass/Grass_01_Green_1.png');

        // Add load event listeners for debugging
        this.load.on('filecomplete', (key: string, type: string, data: any) => {
            console.log(`Loaded ${type}: ${key}`);
        });

        this.load.on('loaderror', (file: any) => {
            console.error(`Failed to load file: ${file.src}`);
        });
    }

    drawSmoothPosition(pos: MainLogic.Position) {

    }

    create() {
        // Initialize the 2D blocks array
        for (let i = 0; i < Scene1.MAP_WIDTH; i++) {
            this.blocks[i] = [];
            this.blockSprites[i] = [];
            for (let j = 0; j < Scene1.MAP_HEIGHT; j++) {
                this.blocks[i][j] = new MainLogic.Block('concrete', i * Scene1.BLOCK_SIZE, j * Scene1.BLOCK_SIZE);
                this.blockSprites[i][j] = null; // Initialize sprite array
            }
        }

        MainLogic.drawBlocks(this, Scene1.MAP_WIDTH, Scene1.MAP_HEIGHT, Scene1.BLOCK_SIZE, this.blocks, new MainLogic.Position(this.startX, this.startY));


        // Mouse click to change block texture
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            let block = MainLogic.getBlockAt(this.blocks, new MainLogic.Position(pointer.x, pointer.y),
                new MainLogic.Position(this.startX, this.startY), Scene1.BLOCK_SIZE);
            if (block) {
                // Toggle block texture between concrete and grass
                if (block.texture_key === 'concrete') {
                    block.texture_key = 'grass';
                } else {
                    block.texture_key = 'concrete';
                }
                this.needsRedraw = true; // Mark for redraw
            }
        });

        // Add keyboard input for player movement
        this.cursors = this.input.keyboard?.addKeys('W,S,A,D');
    }

    draw() {
        this.needsRedraw = true;
    }

    forceDraw() {
        MainLogic.drawBlocks(this, Scene1.MAP_WIDTH, Scene1.MAP_HEIGHT, Scene1.BLOCK_SIZE, this.blocks,
            new MainLogic.Position(this.startX, this.startY));
    }


    update() {
        if (this.cursors.W.isDown) {
            this.player.move('up', this.game.loop.delta / 10); // Use delta time for smooth movement
            this.startY = this.player.y;
            this.startX = this.player.x;
            this.needsRedraw = true; // Mark for redraw
        }
        if (this.cursors.S.isDown) {
            this.player.move('down', this.game.loop.delta / 10);
            this.startY = this.player.y;
            this.startX = this.player.x;
            this.needsRedraw = true;
        }
        if (this.cursors.A.isDown) {
            this.player.move('left', this.game.loop.delta / 10);
            this.startY = this.player.y;
            this.startX = this.player.x;
            this.needsRedraw = true;
        }
        if (this.cursors.D.isDown) {
            this.player.move('right', this.game.loop.delta / 10);
            this.startY = this.player.y;
            this.startX = this.player.x;
            this.needsRedraw = true;
        }
        if (this.needsRedraw) {
            MainLogic.drawBlocks(this, Scene1.MAP_WIDTH, Scene1.MAP_HEIGHT, Scene1.BLOCK_SIZE, this.blocks,
                new MainLogic.Position(this.startX, this.startY));
            this.needsRedraw = false; // Reset redraw flag
        }
    }
}