import { Animation } from "../Animation";
import GameScene from "../../scenes/Game";

export class WonAnimation extends Animation {
  constructor(scene: GameScene) {
    super(scene, 0, 0, "Crown");
  }

  public override play(): void {
    this.scene.winSound?.play({ volume: 0.4 });
    this.easeFromTopAndWiggle();
  }
}
