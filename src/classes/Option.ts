import Phaser from "phaser";
import { Choice } from "./Choice";
import GameScene from "../scenes/Game";

type Image = Phaser.GameObjects.Image;

export class Option extends Phaser.GameObjects.Container {
  private startX: number = 0;
  private startY: number = 0;
  private choice: Choice = Choice.ROCK;
  private selected: boolean = false;
  private icon: Image | null = null;

  constructor(scene: GameScene, x: number, y: number, choice: Choice, isInteractable: boolean = true) {
    super(scene, x, y);

    this.startX = x;
    this.startY = y;
    this.choice = choice;

    if (isInteractable) this.addBounds();

    this.addVisualElements(choice);
    this.addCallbacks(scene);

    scene.add.existing(this);
  }

  private addBounds(): void {
    let rectangle: Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle(-50, -50, 100, 100);
    this.setInteractive(rectangle, Phaser.Geom.Rectangle.Contains);
  }

  private addCallbacks(scene: GameScene): void {
    this.on("pointerdown", () => {
      if (this.selected) return;

      scene.playerChose(this);
      this.select();
    });

    this.on("pointerover", this.hover);
    this.on("pointerout", this.unHover);
  }

  private addVisualElements(choice: Choice) {
    const background: Image = this.scene.add.image(0, 0, "Option-BG");
    background.setScale(0.75);

    this.add([background]);

    this.updateChoice(choice);
  }

  public getChoice(): Choice {
    return this.choice;
  }

  public updateChoice(choice: Choice): void {
    this.choice = choice;

    if (!this.icon) {
      this.icon = this.scene.add.image(0, 0, "Icon-" + choice);
      this.add(this.icon);
    } else {
      this.icon?.setTexture("Icon-" + choice);
    }
  }

  private hover(): void {
    if (this.selected) return;

    this.scene.tweens.add({
      targets: this,
      scale: 1.05,
      ease: "sine.inout",
      repeat: 0,
      duration: 100,
    });
  }

  private unHover(): void {
    if (this.selected) return;

    this.scene.tweens.add({
      targets: this,
      scale: 1,
      ease: "sine.inout",
      repeat: 0,
      duration: 100,
    });
  }

  private select(): void {
    this.unHover();
    this.selected = true;

    this.scene.tweens.add({
      targets: this,
      y: 450,
      x: 400,
      ease: "sine.inout",
      duration: 500,
    });
  }

  public vanish(): void {
    this.scene.tweens.add({
      targets: this,
      y: this.startY + 350,
      ease: "sine.inout",
      duration: 500,
    });

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: "sine.inout",
      duration: 500,
    });
  }

  public easeFromTop(): void {
    this.scene.tweens.add({
      targets: this,
      y: this.startY + 250,
      ease: "sine.inout",
      duration: 600,
    });
  }

  public easeToTop() {
    this.scene.tweens.add({
      targets: this,
      y: this.startY,
      ease: "sine.inout",
      duration: 600,
    });
  }

  public reset(): void {
    this.selected = false;
    this.scene.tweens.add({
      targets: this,
      x: this.startX,
      y: this.startY,
      alpha: 1,
      ease: "sine.inout",
      duration: 500,
    });
  }
}
