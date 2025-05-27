# Phaser Game

This project is a simple bouncing ball game built using Phaser and TypeScript. The game allows users to interact by clicking on the screen to create additional balls that bounce around.

## Project Structure

```
PhaserGame
├── src
│   ├── main.ts            # Entry point of the application
│   ├── scenes
│   │   └── GameScene.ts   # Contains the game scene logic
│   ├── entities
│   │   └── Ball.ts        # Represents a ball entity
│   └── types
│       └── index.ts       # Type definitions and interfaces
├── dist                   # Compiled output directory
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
├── webpack.config.js      # Webpack configuration file
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd PhaserGame
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Run the project:**
   ```
   npm start
   ```

## Usage

- Open the game in your browser.
- Click anywhere on the screen to create new balls.
- Watch the balls bounce around the screen!

## Technologies Used

- Phaser: A fast, robust, and versatile 2D game framework.
- TypeScript: A superset of JavaScript that adds static types.
- Webpack: A module bundler for modern JavaScript applications.

## License

This project is licensed under the MIT License.