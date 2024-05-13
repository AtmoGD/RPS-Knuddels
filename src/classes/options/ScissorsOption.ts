import GameScene from "../../scenes/Game";
import { Option } from "../Option";
import { Choice } from "../Choice";

export class ScissorsOption extends Option {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, Choice.SCISSORS, true);
  }
}
