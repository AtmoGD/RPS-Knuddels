import { Animation } from "../Animation";
import GameScene from "../../scenes/Game";

export class BackgroundAnimation extends Animation {
  constructor(scene: GameScene) {
    super(scene, 0, 0, "Background");

    this.x = this.gameWidth / 2;
    this.y = this.gameHeight / 2;

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
