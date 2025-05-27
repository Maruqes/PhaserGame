export interface BallConfig {
    radius: number;
    color: number;
    initialPosition: { x: number; y: number };
    initialVelocity: { x: number; y: number };
}

export interface GameConfig {
    width: number;
    height: number;
    backgroundColor: string;
    gravity: { x: number; y: number };
    debug: boolean;
}