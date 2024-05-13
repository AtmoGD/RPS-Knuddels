import Phaser from "phaser";
import { Animation } from "../Animation";

export class BackgroundAnimation extends Animation {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "Background");

    this.x = (scene.game.config.width as number) / 2;
    this.y = (scene.game.config.height as number) / 2;

    this.scale = 1;
    this.alpha = 0.1;

    this.play();
  }

  public override play(): void {
    this.scene.tweens.add({
      targets: this,
      angle: 360,
      ease: "linear",
      repeat: -1,
      duration: 100000,
    });
  }
}
