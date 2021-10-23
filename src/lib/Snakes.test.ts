import { CardName, Hand, PlayingCard, SolitaireGameType } from 'typedeck';
import { Difficulty, ROW_LENGTH, Snakes, TARGET_ROW } from './Snakes';

describe('Snakes game', () => {
  it('52 cards should be in the rows and the hand', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    const dealtCards = new Hand([
      ...game.pile.getCards(),
      ...game.rows.flat(1).map(([card]) => card),
    ]);

    (new SolitaireGameType().cardsAllowed as PlayingCard[]).forEach((card) => {
      expect(dealtCards.hasCard(card)).toBeTruthy();
    });
  });

  it('The rows should contain 10 cards each', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    expect(game.rows[0].length).toEqual(10);
  });

  it('The hand should contain the remainder of cards not in the rows', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    expect(game.pile.getCount()).toEqual(52 - game.rows.flat(1).length);
  });

  it('The number of rows should correlate to the difficulty', () => {
    let game = new Snakes(TARGET_ROW.ROW_1, 2);

    expect(game.rows.length).toEqual(2);

    game = new Snakes(TARGET_ROW.ROW_1, 3);

    expect(game.rows.length).toEqual(3);

    game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    expect(game.rows.length).toEqual(4);
  });

  it('Picking up a card moves a card from the pile to the discardPile', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    const initialPileCount = 52 - game.rows.flat(1).length;

    expect(game.pile.getCount()).toEqual(initialPileCount);
    expect(game.discardPile.getCount()).toEqual(0);
    expect(game.nextCard).toBeUndefined();

    const turnedOverCard = game.turnOverPile();

    expect(game.pile.getCount()).toEqual(initialPileCount - 1);
    expect(game.discardPile.getCount()).toEqual(1);
    expect(game.nextCard).toEqual(turnedOverCard);
  });

  it('Turning over a card is not allowed when there is no open card', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Ace)
    ).toThrow();
  });

  it('Turning over a card is not allowed when the open card is a face card', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    jest.spyOn(game, 'nextCard', 'get').mockReturnValue(CardName.King);
    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Ace)
    ).toThrow();
  });

  it('Turning over a card is not allowed when the rowIndex is out of bounds', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    jest.spyOn(game, 'nextCard', 'get').mockReturnValue(CardName.Five);

    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.King)
    ).toThrow();
  });

  it('Turning over a card is allowed when the column corresponds to the opened card', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    jest.spyOn(game, 'nextCard', 'get').mockReturnValue(CardName.Five);

    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Five)
    ).not.toThrow();
  });

  it('Turning over a card is disallowed when the column does not correspond to the opened card', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    jest.spyOn(game, 'nextCard', 'get').mockReturnValue(CardName.Five);

    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Two)
    ).toThrow();
  });

  it('Viewing an unturned card is not allowed', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    expect(() =>
      game.getCardAtPosition(TARGET_ROW.ROW_1, CardName.Ace)
    ).toThrow();
  });

  it('Viewing a turned card is allowed', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    jest.spyOn(game, 'nextCard', 'get').mockReturnValue(CardName.Five);

    game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Five);

    expect(() =>
      game.getCardAtPosition(TARGET_ROW.ROW_1, CardName.Five)
    ).not.toThrow();
  });

  it('Game over detects when the pile is full or empty', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    while (game.pile.getCount()) {
      expect(game.isGameOver()).toBeFalsy();
      game.turnOverPile();
    }

    expect(game.isGameOver()).toBeTruthy();
  });

  it('Game over detects when the rows are flipped or not', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    expect(game.isGameOver()).toBeFalsy();

    game.rows = Array.from(Array(Difficulty.PRO), () =>
      Array.from(Array(ROW_LENGTH), () => [{} as PlayingCard, true])
    );

    expect(game.isGameOver()).toBeTruthy();
  });

  it('Game over error is thrown when turning over a card after the game is over', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    game.rows = Array.from(Array(Difficulty.PRO), () =>
      Array.from(Array(ROW_LENGTH), () => [{} as PlayingCard, true])
    );

    expect(() =>
      game.turnOverCardAtPosition(TARGET_ROW.ROW_1, CardName.Ace)
    ).toThrow();
  });

  it('Correctly scores a full house on a pro difficulty match', () => {
    const game = new Snakes(TARGET_ROW.ROW_1);

    game.rows = Array.from(Array(Difficulty.PRO), () =>
      Array.from(Array(ROW_LENGTH), () => [{} as PlayingCard, true])
    );

    expect(game.calculatePoints()).toEqual(1000);
  });

  it('Correctly scores a full house on an intermediate difficulty match', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.INTERMEDIATE);

    game.rows = Array.from(Array(Difficulty.INTERMEDIATE), () =>
      Array.from(Array(ROW_LENGTH), () => [{} as PlayingCard, true])
    );

    expect(game.calculatePoints()).toEqual(800);
  });

  it('Correctly scores a partial house on an pro difficulty match', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    game.rows = Array.from(Array(Difficulty.PRO), () =>
      Array.from(Array(ROW_LENGTH), () => [{} as PlayingCard, true])
    );

    game.rows[0] = [
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
    ];

    expect(game.calculatePoints()).toEqual(800 + 20 * 6);
  });

  it('Correctly scores a completed target row', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    game.rows[0] = [
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
    ];

    expect(game.calculatePoints()).toEqual(250);
  });

  it('Correctly scores a completed non target row', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    game.rows[1] = [
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
    ];

    expect(game.calculatePoints()).toEqual(150);
  });

  it('Correctly scores partial target rows', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    game.rows[0] = [
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
    ];

    expect(game.calculatePoints()).toEqual(6 * 20);
  });

  it('Correctly scores partial target rows', () => {
    const game = new Snakes(TARGET_ROW.ROW_1, Difficulty.PRO);

    game.rows[1] = [
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, false],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
      [{} as PlayingCard, true],
    ];

    expect(game.calculatePoints()).toEqual(6 * 10);
  });
});
