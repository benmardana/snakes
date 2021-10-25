import { useEffect, useState } from 'react';
import { Popover2 } from '@blueprintjs/popover2';
import { PlayingCard } from 'typedeck';
import { Button, Intent, Menu, MenuItem, Position } from '@blueprintjs/core';

import Snakes from './lib';
import { Difficulty, getDifficultyName, TARGET_ROW } from './lib/Snakes';
import Cards from './components/Cards';
import Help from './components/Help';
import Navbar from './components/Navbar';
import DrawPiles from './components/DrawPiles';
import HighScores from './components/HighScores';
import usePreload from './hooks/usePreload';
import { showToast } from './utils/toaster';

import styles from './root.module.scss';

const Root = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.PRO);
  const [targetRow, setTargetRow] = useState<TARGET_ROW>(TARGET_ROW.ROW_1);
  const [game, setGame] = useState<Snakes>(new Snakes(targetRow, difficulty));
  const [gameMeta, setGameMeta] = useState({ score: game.calculatePoints() });
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showHighScoreDialog, setShowHighScoreDialog] = useState(false);
  usePreload();

  const updateScore = () => setGameMeta({ score: game.calculatePoints() });

  const resetGame = (
    resetTargetRow: TARGET_ROW,
    resetDifficulty: Difficulty
  ) => {
    setGame(new Snakes(resetTargetRow, resetDifficulty));
  };

  const handleOnCardClicked = (row: number, column: number) => {
    try {
      game.turnOverCardAtPosition(row, column);
    } catch (error) {
      // pop a toast with the error message
      if (error instanceof Error) {
        console.error(error.message);
        showToast({
          message: error.message,
          intent: Intent.WARNING,
          timeout: 2000,
        });
      }
    }
    updateScore();
  };

  const handleOnPileClicked = game.pile.isEmpty()
    ? undefined
    : () => {
        game.turnOverPile();
        updateScore();
      };

  const discardTop = game.discardPile.isEmpty()
    ? undefined
    : (game.discardPile.cardAtIndex(0) as PlayingCard);

  const handleOnChangeDifficulty = (newDifficulty: Difficulty) => {
    resetGame(targetRow, newDifficulty);
    setDifficulty(newDifficulty);
  };

  const handleOnChangeTargetRow = (newRow: TARGET_ROW) => {
    resetGame(newRow, difficulty);
    setTargetRow(newRow);
  };

  return (
    <div className={styles.Root}>
      <Navbar>
        <Button
          text="New Game"
          onClick={() => setGame(new Snakes(0, difficulty))}
          minimal
        />
        <Popover2
          content={
            <Menu>
              <MenuItem
                text="Rookie"
                onClick={() => handleOnChangeDifficulty(Difficulty.ROOKIE)}
              />
              <MenuItem
                text="Intermediate"
                onClick={() =>
                  handleOnChangeDifficulty(Difficulty.INTERMEDIATE)
                }
              />
              <MenuItem
                text="Pro"
                onClick={() => handleOnChangeDifficulty(Difficulty.PRO)}
              />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button
            text={`Difficulty (${getDifficultyName(difficulty)})`}
            minimal
          />
        </Popover2>
        <Popover2
          content={
            <Menu>
              {[...Array(difficulty)].map((_, index) => (
                <MenuItem
                  key={index}
                  text={`Row ${index + 1}`}
                  onClick={() => handleOnChangeTargetRow(index)}
                />
              ))}
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button text={`Target row (${targetRow + 1})`} minimal />
        </Popover2>
        <Button
          text="High Scores"
          onClick={() => setShowHighScoreDialog(true)}
          minimal
        />
        <Button text="Help" onClick={() => setShowHelpDialog(true)} minimal />
        <strong style={{ marginLeft: '156px' }}>Score: {gameMeta.score}</strong>
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
