import Phaser from "phaser";
import { Animation } from "../Animation";

export class ChooseAnimation extends Animation {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "Choose");

    this.x = (scene.game.config.width as number) / 2;
    this.y = (scene.game.config.height as number) / 2;

    this.scale = 0;
    this.alpha = 0;

    this.play();
    this.Show();
  }

  public override play(): void {
    this.wiggle(5, 0.4, -1);
  }

  public Show(): void {
    this.zoomIn();
    this.fadeIn();
  }

  public Hide(): void {
    this.zoomOut();
    this.fadeOut();
  }
}
