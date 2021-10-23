import { useState } from 'react';
import { PlayingCard } from 'typedeck';
import { Button } from '@blueprintjs/core';

import Snakes from './lib';
import { Difficulty, TARGET_ROW } from './lib/Snakes';
import Cards from './components/Cards';
import Help from './components/Help';
import Navbar from './components/Navbar';
import DrawPiles from './components/DrawPiles';
import HighScores from './components/HighScores';
import usePreload from './hooks/usePreload';
import useForceUpdate from './hooks/useForceUpdate';

import styles from './root.module.scss';

const Root = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.PRO);
  const [game, setGame] = useState<Snakes>(new Snakes(0, difficulty));
  const [targetRow, setTargetRow] = useState<TARGET_ROW>();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showHighScoreDialog, setShowHighScoreDialog] = useState(false);
  usePreload();
  const forceUpdate = useForceUpdate();

  const handleOnCardClicked = (row: number, column: number) => {
    console.log(row, column);
  };

  const handleOnPileClicked = () => {
    game.turnOverPile();
    forceUpdate();
  };

  const discardTop = game.discardPile.isEmpty()
    ? undefined
    : (game.discardPile.cardAtIndex(0) as PlayingCard);

  return (
    <div className={styles.Root}>
      <Navbar>
        <Button text="New Game" minimal />
        <Button
          text="High Scores"
          onClick={() => setShowHighScoreDialog(true)}
          minimal
        />
        <Button text="Help" onClick={() => setShowHelpDialog(true)} minimal />
      </Navbar>
      <div className={styles.Game}>
        <Cards cards={game.rows} onCardClicked={handleOnCardClicked} />
        <DrawPiles onClickPile={handleOnPileClicked} showCard={discardTop} />
      </div>
      <HighScores
        isOpen={showHighScoreDialog}
        onClose={() => setShowHighScoreDialog(false)}
      />
      <Help isOpen={showHelpDialog} onClose={() => setShowHelpDialog(false)} />
    </div>
  );
};

export default Root;
