import Phaser from "phaser";
import { Animation } from "../Animation";

export class WonAnimation extends Animation {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "Crown");
  }

  public override play(): void {
    this.easeFromTopAndWiggle();
  }
}
