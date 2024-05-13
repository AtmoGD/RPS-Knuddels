import Phaser from "phaser";

type Image = Phaser.GameObjects.Image;

export class Animation extends Phaser.GameObjects.Container {
  protected gameWidth: number = this.scene.game.config.width as number;
  protected gameHeight: number = this.scene.game.config.height as number;

  constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
    super(scene, x, y);

    this.scale = 0;
    this.alpha = 0;

    this.addImage(scene, image);

    scene.add.existing(this);
  }

  private addImage(scene: Phaser.Scene, image: string) {
    const newImage: Image = scene.add.image(0, 0, image);
    this.add(newImage);
  }

  public play(): void {}

  protected easeFromTopAndWiggle(
    speed: number = 1,
    wiggleSpeed: number = 1,
    wiggles: number = 2,
    startAngle: number = 20
  ): void {
    this.easeFromTop(speed);
    this.zoomInAndOut(speed);
    this.fadeInAndOut(speed);
    this.wiggle(startAngle, wiggleSpeed, wiggles);
  }

  protected fadeIn(speed: number = 1): void {
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });
  }

  protected fadeOut(speed: number = 1): void {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });
  }

  protected fadeInAndOut(speed: number = 1): void {
    this.alpha = 0;

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: "sine.inout",
      repeat: 0,
      duration: 1000 * (1 / speed),
      delay: 1100 * (1 / speed),
    });
  }

  protected easeFromTop(speed: number = 1): void {
    this.x = this.gameWidth / 2;
    this.y = -200;

    this.scene.tweens.add({
      targets: this,
      y: this.gameHeight / 2,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });

    this.scene.tweens.add({
      targets: this,
      y: this.gameHeight + 200,
      ease: "sine.inout",
      repeat: 0,
      duration: 1000 * (1 / speed),
      delay: 1100 * (1 / speed),
    });
  }

  protected zoomIn(zoom: number = 1, speed: number = 1): void {
    this.scene.tweens.add({
      targets: this,
      scale: zoom,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });
  }
  protected zoomOut(speed: number = 1): void {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });
  }

  protected zoomInAndOut(speed: number = 1): void {
    this.scale = 0;

    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: "sine.inout",
      repeat: 0,
      duration: 800 * (1 / speed),
    });

    this.scene.tweens.add({
      targets: this,
      scale: 0,
      ease: "sine.inout",
      repeat: 0,
      duration: 1000 * (1 / speed),
      delay: 1100 * (1 / speed),
    });
  }

  protected wiggle(
    startAngle: number = 10,
    speed: number = 1,
    wiggles: number = 2
  ): void {
    this.angle = startAngle;

    this.scene.tweens.add({
      targets: this,
      ease: "sine.inout",
      angle: -startAngle,
      yoyo: true,
      repeat: wiggles,
      duration: 800 * (1 / speed),
    });
  }
}
