import { Animation } from "../Animation";
import GameScene from "../../scenes/Game";

export class LostAnimation extends Animation {
  constructor(scene: GameScene) {
    super(scene, 0, 0, "Skull");
  }

  public override play(): void {
    this.scene.loseSound?.play({ volume: 0.2 });
    this.easeFromTopAndWiggle(1, 4, 3, 10);
  }
}
