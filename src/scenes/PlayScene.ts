class TestScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors: any;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  stars;
  readonly PLAYER = "player";
  readonly DESERT = "Desert";
  readonly MAP = "map";
  readonly PLATFORM = "platform";
  readonly SKY = "sky";
  readonly STAR = "star";

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    // this.load.tilemapTiledJSON(this.MAP_KEY, "/assets/tilemaps/desert.json");
    // this.load.image(this.DESERT_KEY, "/assets/tilemaps/tmw_desert_spacing.png");
    this.load.image(this.PLATFORM, "/assets/platform.png");
    this.load.image(this.PLAYER, "/assets/sprites/mushroom.png");
    this.load.image(this.SKY, "assets/sky.png");
    this.load.image(this.STAR, "assets/star.png");
  }

  create() {
    // const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
    //   key: this.MAP_KEY
    // });
    // const tileset: Phaser.Tilemaps.Tileset = map.addTilesetImage(
    //   this.DESERT_KEY
    // );
    // const layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(
    //   0,
    //   tileset,
    //   0,
    //   0
    // );

    // ! background
    this.add.image(400, 300, "sky");

    // ! platforms
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, this.PLATFORM)
      //@ts-ignore
      .setScale(2)
      .refreshBody();

    this.platforms.create(600, 400, this.PLATFORM);
    this.platforms.create(50, 250, this.PLATFORM);
    this.platforms.create(750, 220, this.PLATFORM);

    // ! stars
    this.stars = this.physics.add.group({
      //@ts-ignore
      key: this.STAR,
      repeat: 5, //11+ 1 is created automatically
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate(child => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // ! player
    this.player = this.physics.add.sprite(100, 100, this.PLAYER);
    // this.player.setBounce(0.2, 0);
    // @ts-ignore
    this.player.body.setGravityY(2500);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.startFollow(this.player, false);

    // ! physics
    // @ts-ignore
    this.physics.add.collider(this.player, this.platforms);
    // @ts-ignore
    this.physics.add.collider(this.stars, this.platforms);

    this.physics.add.overlap(
      // @ts-ignore
      this.player,
      this.stars,
      (player, star) => {
        star.disableBody(true, true);
      },
      null,
      this
    );
  }

  update(time: number, delta: number) {
    // this.player.angle += 1;
    if (this.cursors.left.isDown) {
      //   this.player.x -= 5;
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      //   this.player.x += 5;
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    // @ts-ignore
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-1200);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(2000);
    }

    // if (this.cursors.up.isDown) {
    //   this.player.y -= 10;
    // }
  }
}

export default TestScene;
