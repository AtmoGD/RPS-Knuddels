import GameScene from "../../scenes/Game";
import { Option } from "../Option";
import { Choice } from "../Choice";

export class EnemyOption extends Option {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, Choice.ROCK, false);
  }

  public useRandomChoice(): void {
    let rndNumber: number = Math.floor(Math.random() * 3);
    let newCoice: Choice = Choice.ROCK;

    switch (rndNumber) {
      case 0:
        newCoice = Choice.ROCK;
      case 1:
        newCoice = Choice.PAPER;
      case 2:
        newCoice = Choice.SCISSORS;
    }
  }
}
