import Phaser from "phaser";
import GameScene from "../../scenes/Game";
import { Option } from "../Option";
import { Choice } from "../Choice";

export class RockOption extends Option {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, Choice.ROCK, true);
  }
}
