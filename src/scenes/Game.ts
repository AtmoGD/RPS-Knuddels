import Phaser from "phaser";
import { Option } from "../classes/Option";
import { Choice } from "../classes/Choice";
import { Score } from "../classes/Score";
import { Animation } from "../classes/Animation";
import { BackgroundAnimation } from "../classes/animations/BackgroundAnimation";
import { WonAnimation } from "../classes/animations/WonAnimation";
import { LostAnimation } from "../classes/animations/LostAnimation";
import { DrawAnimation } from "../classes/animations/DrawAnimation";
import { ChooseAnimation } from "../classes/animations/ChooseAnimation";

const positionRock = {
  x: 200,
  y: 500,
};

const positionPaper = {
  x: 400,
  y: 500,
};

const positionScissors = {
  x: 600,
  y: 500,
};

const rules = {
  Rock: ["Scissors"],
  Paper: ["Rock"],
  Scissors: ["Paper"],
};

export default class GameScene extends Phaser.Scene {
  private playerScore: Score | null = null;
  private enemyScore: Score | null = null;

  private optionRock: Option | null = null;
  private optionPaper: Option | null = null;
  private optionScissors: Option | null = null;

  private enemyOption: Option | null = null;

  private chooseAnimation: ChooseAnimation | null = null;
  private wonAnimation: Animation | null = null;
  private lostAnimation: Animation | null = null;
  private drawAnimation: Animation | null = null;

  constructor() {
    super("GameScene");
  }

  preload(): void {
    this.load.svg("Icon-Rock", "assets/Icon_Rock.svg");
    this.load.svg("Icon-Paper", "assets/Icon_Paper.svg");
    this.load.svg("Icon-Scissors", "assets/Icon_Scissors.svg");
    this.load.image("Crown", "assets/Icon_Crown.png");
    this.load.image("Skull", "assets/Icon_Skull.png");
    this.load.image("Dots", "assets/Icon_Dots.png");
    this.load.image("Choose", "assets/Choose.png");
    this.load.image("Option-BG", "assets/Option_Background.png");
    this.load.image("Background", "assets/CircusTent.png");
  }

  create(): void {
    this.createBackroundGradient();
    new BackgroundAnimation(this);

    this.optionRock = new Option(this, positionRock.x, positionRock.y, Choice.ROCK);
    this.optionPaper = new Option(this, positionPaper.x, positionPaper.y, Choice.PAPER);
    this.optionScissors = new Option(this, positionScissors.x, positionScissors.y, Choice.SCISSORS);

    this.enemyOption = new Option(this, 400, -100, Choice.ROCK, false);

    this.playerScore = new Score(this, 50, 50, "You");
    this.enemyScore = new Score(this, 625, 50, "Enemy");

    this.chooseAnimation = new ChooseAnimation(this);
    this.wonAnimation = new WonAnimation(this);
    this.lostAnimation = new LostAnimation(this);
    this.drawAnimation = new DrawAnimation(this);
  }

  update(): void {}

  public async playerChose(option: Option): Promise<void> {
    const playerChoice: Choice = option.getChoice();
    const enemyChoice: Choice = this.getRandomChoice();

    const playerBeatsEnemy: boolean = this.beats(playerChoice, enemyChoice);
    const enemyBeatsPlayer: boolean = this.beats(enemyChoice, playerChoice);
    const draw: boolean = playerBeatsEnemy == enemyBeatsPlayer;

    this.vanishUnusedOptions(playerChoice);
    this.chooseAnimation?.Hide();

    this.enemyOption?.updateChoice(enemyChoice);
    this.enemyOption?.easeFromTop();

    await this.delay(1000);

    if (playerBeatsEnemy) {
      this.playerScore?.increaseScore();
      this.wonAnimation?.play();
    } else if (enemyBeatsPlayer) {
      this.enemyScore?.increaseScore();
      this.lostAnimation?.play();
    } else if (draw) {
      this.drawAnimation?.play();
    } else {
      alert("Something went really really wrong!");
    }
    await this.delay(1000);
    this.enemyOption?.easeToTop();

    await this.delay(500);
    this.resetOptions();
    this.chooseAnimation?.Show();
  }

  private vanishUnusedOptions(choice: Choice) {
    if (this.optionRock && this.optionRock.getChoice() != choice) this.optionRock?.vanish();
    if (this.optionPaper && this.optionPaper.getChoice() != choice) this.optionPaper.vanish();
    if (this.optionScissors && this.optionScissors.getChoice() != choice) this.optionScissors.vanish();
  }

  private resetOptions(): void {
    this.optionRock?.reset();
    this.optionPaper?.reset();
    this.optionScissors?.reset();
  }

  private getRandomChoice(): Choice {
    let rndNumber: number = Math.floor(Math.random() * 3);
    switch (rndNumber) {
      case 0:
        return Choice.ROCK;
      case 1:
        return Choice.PAPER;
      case 2:
        return Choice.SCISSORS;
    }
    return Choice.ROCK;
  }

  private beats(choiceA: Choice, choiceB: Choice): boolean {
    switch (choiceA) {
      case Choice.ROCK:
        return rules.Rock.includes(choiceB);
      case Choice.PAPER:
        return rules.Paper.includes(choiceB);
      case Choice.SCISSORS:
        return rules.Scissors.includes(choiceB);
    }
  }

  // Thanks to: https://stackoverflow.com/questions/37764665/how-to-implement-sleep-function-in-typescript
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Thanks to: https://www.html5gamedevs.com/topic/38109-gradient-rectangle-in-phaser-3/
  private createBackroundGradient(): void {
    let width: number = this.game.config.width as number;
    let height: number = this.game.config.height as number;

    let texture = this.textures.createCanvas("gradient", width, height);
    let context = texture.getContext();
    let gradient = context.createRadialGradient(width / 2, height / 2, 800, width, height, 0);

    gradient.addColorStop(0, "#61CEF2");
    gradient.addColorStop(1, "#3867F5");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    this.add.image(width / 2, height / 2, "gradient");

    //  Call this if running under WebGL, or you'll see nothing change
    texture.refresh();
  }
}
