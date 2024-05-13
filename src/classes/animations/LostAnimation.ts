import Phaser from "phaser";
import { Animation } from "../Animation";

export class LostAnimation extends Animation {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "Skull");
  }

  public override play(): void {
    this.easeFromTopAndWiggle(1, 4, 3, 10);
  }
}
