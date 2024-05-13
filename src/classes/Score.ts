import Phaser from "phaser";

export class Score extends Phaser.GameObjects.Text {
  private score: number = 0;
  private displayName: string = "";
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    displayName: string,
    text: string = "0",
    style = {
      align: "center",
      fontFamily: "cuteDino",
      fontSize: "42px",
      color: "#fdf7f0",
    }
  ) {
    super(scene, x, y, text, style);

    this.displayName = displayName;

    this.updateTextContent();

    scene.add.existing(this);
  }

  public increaseScore(): void {
    this.score++;
    this.updateTextContent();
  }

  public updateTextContent(): void {
    this.setText(this.displayName + "\n" + this.score.toString());
  }
}
