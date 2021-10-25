import {
  PlayingCard,
  Hand,
  SolitaireGameType,
  IHand,
  CardName,
} from 'typedeck';

export enum TARGET_ROW {
  ROW_1,
  ROW_2,
  ROW_3,
  ROW_4,
}

export enum Difficulty {
  ROOKIE = 2,
  INTERMEDIATE = 3,
  PRO = 4,
}

export const getDifficultyName = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.ROOKIE:
      return 'Rookie';
    case Difficulty.INTERMEDIATE:
      return 'Intermediate';
    case Difficulty.PRO:
      return 'Pro';
    default:
      return '???';
  }
};

export const ROW_LENGTH = 10;

export type RowCard = [card: PlayingCard, isFlipped: boolean];

export class Snakes {
  private difficulty: Difficulty;

  public pile: IHand;

  public discardPile: IHand;

  public rows: RowCard[][];

  private targetRow: TARGET_ROW;

  private lastCardTouched?: CardName;

  constructor(targetRow: TARGET_ROW, difficulty: Difficulty = Difficulty.PRO) {
    this.difficulty = difficulty;
    this.pile = new Hand();
    this.discardPile = new Hand();
    this.targetRow = targetRow;

    const deck = new SolitaireGameType().createDeck();
    deck.shuffle();

    this.rows = Array.from(Array(this.difficulty), () =>
      Array.from(Array(ROW_LENGTH), () => [
        deck.takeCard() as PlayingCard,
        false,
      ])
    );

    deck.deal(this.pile, -1);
  }

  // Turn over a card on the pile
  turnOverPile() {
    if (this.pile.getCount()) {
      const card = this.pile.takeCard();
      this.discardPile.addCard(card);
      this.lastCardTouched = card.cardName;
    }

    return this.nextCard!;
  }

  turnOverCardAtPosition(rowIndex: TARGET_ROW, columnIndex: CardName) {
    this.checkGameOver();

    if (this.nextCard === undefined) {
      throw Error('Turn over a card from your card stack to start the game!');
    }

    if (this.nextCard > CardName.Ten) {
      throw Error('The last turned over card must not be a face card');
    }

    if (columnIndex > CardName.Ten) {
      throw Error('???');
    }

    const allowedColumn = this.nextCard;

    if (allowedColumn !== columnIndex) {
      throw Error(
        'You can only select a card in a column matching the number of your last turned card'
      );
    }

    const targetCard = this.rows[rowIndex][columnIndex][0];

    this.rows[rowIndex][columnIndex] = [targetCard, true];
    this.lastCardTouched = targetCard.cardName;
  }

  getCardAtPosition(rowIndex: TARGET_ROW, columnIndex: CardName) {
    const targetCard = this.rows[rowIndex][columnIndex];

    if (!targetCard[1]) {
      throw Error('Card has not been turned over');
    }

    return targetCard[0];
  }

  private checkGameOver() {
    if (this.isGameOver()) {
      throw Error('Game over');
    }
  }

  isGameOver() {
    return (
      this.pile.isEmpty() ||
      this.rows.every((row) => row.every(([, isFlipped]) => isFlipped))
    );
  }

  /* 
  Scoring:
    Target row complete: 250
    Other row complete: 150
    4 rows: 1000
    3 rows: 800
    Declared card in target row: 20
    Declared card in other row: 10
   */
  calculatePoints() {
    const rowResults = this.rows.map((row) =>
      row.every(([, isFlipped]) => isFlipped)
    );

    const completedRows = rowResults.filter(Boolean).length;

    // check for 4 rows complete
    if (completedRows === Difficulty.PRO) {
      return 1000;
    }

    let runningScore = 0;

    // check for 3 rows complete
    if (completedRows === Difficulty.INTERMEDIATE) {
      runningScore += 800;
      if (this.difficulty === Difficulty.INTERMEDIATE) {
        return runningScore;
      }

      const incompleteRowIndex = rowResults.findIndex((result) => !result);

      runningScore +=
        this.rows[incompleteRowIndex].filter(([, isFlipped]) => isFlipped)
          .length * (this.targetRow === incompleteRowIndex ? 20 : 10);

      return runningScore;
    }

    // check for completed rows and declared cards
    this.rows.forEach((row, index) => {
      if (row.every(([, isFlipped]) => isFlipped)) {
        runningScore += this.targetRow === index ? 250 : 150;
      } else {
        runningScore +=
          row.filter(([, isFlipped]) => isFlipped).length *
          (this.targetRow === index ? 20 : 10);
      }
    });

    return runningScore;
  }

  // Get the allowed next target card
  get nextCard() {
    return this.lastCardTouched;
  }
}

export default Snakes;
