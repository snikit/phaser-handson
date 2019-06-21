import "phaser";

import TestScene from "./scenes/PlayScene";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 2500 },
      debug: false
    }
  },
  scene: [TestScene]
};

new Phaser.Game(config);
