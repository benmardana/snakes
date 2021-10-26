import { useState } from 'react';
import { Popover2 } from '@blueprintjs/popover2';
import { PlayingCard } from 'typedeck';
import {
  Button,
  Colors,
  Intent,
  Menu,
  MenuItem,
  Position,
} from '@blueprintjs/core';

import Snakes from './lib';
import { Difficulty, getDifficultyName, TARGET_ROW } from './lib/Snakes';
import Cards from './components/Cards';
import Help from './components/Help';
import Navbar from './components/Navbar';
import DrawPiles from './components/DrawPiles';
import HighScores from './components/HighScores';
import AddScore from './components/AddScore';
import usePreload from './hooks/usePreload';
import { showToast } from './utils/toaster';

import styles from './root.module.scss';

const DEFAULT_ROW = TARGET_ROW.ROW_1;
const DEFAULT_DIFFICULTY = Difficulty.PRO;

const Root = () => {
  usePreload();
  const [{ targetRow, difficulty }, setGameSettings] = useState({
    targetRow: DEFAULT_ROW,
    difficulty: DEFAULT_DIFFICULTY,
  });

  const [showAddHighScoreDialog, setShowAddHighScoreDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showHighScoreDialog, setShowHighScoreDialog] = useState(false);
  const handleOnGameOver = () => {
    setShowAddHighScoreDialog(true);
  };

  const [game, setGame] = useState<Snakes>(
    new Snakes(targetRow, handleOnGameOver, difficulty)
  );
  const [gameMeta, setGameMeta] = useState({ score: game.calculatePoints() });

  const updateScore = () => setGameMeta({ score: game.calculatePoints() });

  const confirmChange = () =>
    game.discardPile.isEmpty() ||
    // eslint-disable-next-line no-alert
    window.confirm(
      'This will reset your game and lose progress\nDo you want to proceed?'
    );

  const resetGame = (
    resetTargetRow: TARGET_ROW,
    resetDifficulty: Difficulty
  ) => {
    setGame(new Snakes(resetTargetRow, handleOnGameOver, resetDifficulty));
    updateScore();
  };

  const handleOnCardClicked = (row: number, column: number) => {
    try {
      game.turnOverCardAtPosition(row, column);
    } catch (error) {
      // pop a toast with the error message
      if (error instanceof Error) {
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
        try {
          game.turnOverPile();
        } catch (error) {
          // pop a toast with the error message
          if (error instanceof Error) {
            showToast({
              message: error.message,
              intent: Intent.WARNING,
              timeout: 2000,
            });
          }
        } finally {
          updateScore();
        }
      };

  const discardTop = game.discardPile.isEmpty()
    ? undefined
    : (game.discardPile.cardAtIndex(0) as PlayingCard);

  const handleOnNewGame = () => {
    if (confirmChange()) {
      resetGame(DEFAULT_ROW, DEFAULT_DIFFICULTY);
    }
  };

  const handleOnChangeDifficulty = (newDifficulty: Difficulty) => {
    if (confirmChange()) {
      resetGame(DEFAULT_ROW, newDifficulty);
      setGameSettings({ targetRow: DEFAULT_ROW, difficulty: newDifficulty });
    }
  };

  const handleOnChangeTargetRow = (newRow: TARGET_ROW) => {
    if (confirmChange()) {
      resetGame(newRow, DEFAULT_DIFFICULTY);
      setGameSettings({ targetRow: newRow, difficulty: DEFAULT_DIFFICULTY });
    }
  };

  return (
    <div className={styles.Root}>
      <Navbar>
        <Button text="New Game" onClick={() => handleOnNewGame()} minimal />
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
          <Button
            text={
              <span style={{ color: Colors.GOLD4 }}>
                Target row ({`${targetRow + 1}`})
              </span>
            }
            minimal
          />
        </Popover2>
        <Button
          text="High Scores"
          onClick={() => setShowHighScoreDialog(true)}
          minimal
        />
        <Button text="Help" onClick={() => setShowHelpDialog(true)} minimal />
        <h2 style={{ flexGrow: 1, textAlign: 'right' }}>
          Score: {gameMeta.score}
        </h2>
      </Navbar>
      <div className={styles.Game}>
        <Cards
          cards={game.rows}
          onCardClicked={handleOnCardClicked}
          targetRow={targetRow}
        />
        <DrawPiles onClickPile={handleOnPileClicked} showCard={discardTop} />
      </div>
      <HighScores
        isOpen={showHighScoreDialog}
        onClose={() => setShowHighScoreDialog(false)}
      />
      <Help isOpen={showHelpDialog} onClose={() => setShowHelpDialog(false)} />
      <AddScore
        score={gameMeta.score}
        onClose={() => {
          setShowAddHighScoreDialog(false);
          setShowHighScoreDialog(true);
          resetGame(DEFAULT_ROW, DEFAULT_DIFFICULTY);
        }}
        isOpen={showAddHighScoreDialog}
      />
    </div>
  );
};

export default Root;
