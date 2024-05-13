import { Animation } from "../Animation";
import GameScene from "../../scenes/Game";

export class DrawAnimation extends Animation {
  constructor(scene: GameScene) {
    super(scene, 0, 0, "Dots");

    this.x = this.gameWidth / 2;
    this.y = this.gameHeight / 2;
  }

  public override play(): void {
    this.scene.drawSound?.play({ volume: 0.3 });
    this.zoomInAndOut();
    this.fadeInAndOut();
  }
}
