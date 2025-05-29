export class Position {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Block {
    public texture_key: string;
    public x: number;
    public y: number;

    constructor(texture_key: string, x: number, y: number) {
        this.texture_key = texture_key;
        this.x = x;
        this.y = y;
    }
}

export function createBlock(x: number, y: number, width: number, height: number, texture_key: string, scene: Phaser.Scene): Phaser.GameObjects.Image {
    const block = scene.add.image(x, y, texture_key);
    block.setOrigin(0, 0);
    block.setDisplaySize(width, height);
    return block;
}

export function drawBlocks(scene: Phaser.Scene, mapWidth: number, mapHeight: number, blockSize: number, blocks: Block[][], startPos: Position): void {
    // Clear existing block sprites
    scene.children.removeAll(true);

    let offset = 2;
    
    // Calculate visible range based on screen size and player position
    const screenWidth = scene.cameras.main.width;
    const screenHeight = scene.cameras.main.height;
    const blocksPerScreenWidth = Math.ceil(screenWidth / blockSize);
    const blocksPerScreenHeight = Math.ceil(screenHeight / blockSize);
    
    const startI = Math.max(0, Math.floor(startPos.x / blockSize) - offset);
    const endI = Math.min(blocks.length, Math.floor(startPos.x / blockSize) + blocksPerScreenWidth + offset);
    const startJ = Math.max(0, Math.floor(startPos.y / blockSize) - offset);
    const endJ = Math.min(blocks[0].length, Math.floor(startPos.y / blockSize) + blocksPerScreenHeight + offset);
    
    // Draw all blocks in the visible range
    for (let i = startI; i < endI; i++) {
        for (let j = startJ; j < endJ; j++) {
            if (blocks[i][j] === undefined || blocks[i][j] === null) {
                continue; // Skip undefined blocks
            }
            const block = blocks[i][j];
            createBlock(block.x - (startPos.x), block.y - (startPos.y), blockSize, blockSize, block.texture_key, scene);
        }
    }
}

export function getBlockAt(blocks: Block[][], blockPos: Position, startPos: Position, blockSize: number): Block | null {
    const x_index = Math.floor((blockPos.x + startPos.x) / blockSize);
    const y_index = Math.floor((blockPos.y + startPos.y) / blockSize);

    if (x_index >= 0 && x_index < blocks.length && y_index >= 0 && y_index < blocks[0].length) {
        return blocks[x_index][y_index];
    }
    return null;
}