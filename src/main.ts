import Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: Scene1,
    roundPixels: true,
    parent: document.body,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Prevent scrolling
document.body.style.overflow = 'hidden';
document.body.style.margin = '0';
document.body.style.padding = '0';

// Start the game
const game = new Phaser.Game(config);