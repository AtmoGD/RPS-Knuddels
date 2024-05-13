import Phaser from "phaser";
import { Animation } from "../Animation";

export class DrawAnimation extends Animation {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "Dots");
    this.x = this.gameWidth / 2;
    this.y = this.gameHeight / 2;
  }

  public override play(): void {
    this.zoomInAndOut();
    this.fadeInAndOut();
  }
}
