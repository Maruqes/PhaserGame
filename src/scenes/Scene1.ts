class Block {
    public texture_key: string;
    public x: number;
    public y: number;

    constructor(texture_key: string, x: number, y: number) {
        this.texture_key = texture_key;
        this.x = x;
        this.y = y;
    }
}

export class Scene1 extends Phaser.Scene {

    private static readonly MAP_WIDTH = 100; // Reduced for better performance
    private static readonly MAP_HEIGHT = 100; // Reduced for better performance
    private static readonly BLOCK_SIZE = 32; // Smaller blocks for better view
    private static readonly MIDDLE_X_VECTOR = Scene1.MAP_WIDTH / 2;
    private static readonly MIDDLE_Y_VECTOR = Scene1.MAP_HEIGHT / 2;

    private blocks: Block[][] = [];
    private needsRedraw: boolean = true;

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

    create() {
        // Add scene title
        const text = this.add.text(10, 10, 'Scene 1 - Click blocks to change texture, Press SPACE for Scene 2', {
            fontSize: '16px',
            color: '#ffffff'
        });

        // Initialize the 2D blocks array
        for (let i = 0; i < Scene1.MAP_WIDTH; i++) {
            this.blocks[i] = [];
            for (let j = 0; j < Scene1.MAP_HEIGHT; j++) {
                this.blocks[i][j] = new Block('concrete', i * Scene1.BLOCK_SIZE, j * Scene1.BLOCK_SIZE);
            }
        }

        // Draw initial blocks
        this.drawBlocks();

        // Mouse click to change block texture
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const x_index = Math.floor(pointer.x / Scene1.BLOCK_SIZE);
            const y_index = Math.floor(pointer.y / Scene1.BLOCK_SIZE);

            if (x_index >= 0 && x_index < Scene1.MAP_WIDTH && y_index >= 0 && y_index < Scene1.MAP_HEIGHT) {
                this.blocks[x_index][y_index].texture_key = 'grass';
                this.needsRedraw = true;
            }
        });

    }

    update() {
        this.drawBlocks();
    }

    drawBlocks() {
        // Clear existing block sprites
        this.children.removeAll(true);

        // Draw all blocks
        for (let i = 0; i < Scene1.MAP_WIDTH; i++) {
            for (let j = 0; j < Scene1.MAP_HEIGHT; j++) {
                const block = this.blocks[i][j];
                this.createBlock(block.x, block.y, Scene1.BLOCK_SIZE, Scene1.BLOCK_SIZE, block.texture_key);
            }
        }
    }

    createBlock(x: number, y: number, width: number, heigth: number, texture_key: string) {
        const block = this.add.image(x, y, texture_key);
        block.setOrigin(0, 0);
        block.setDisplaySize(width, heigth);
        return block;
    }
}