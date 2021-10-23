import { useMemo, useState } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import Snakes from './lib';
import Card from './components/Card';
import Help from './components/Help';
import HighScores from './components/HighScores';
import { Difficulty, ROW_LENGTH, TARGET_ROW } from './lib/Snakes';
import usePreload from './hooks/usePreload';
import styles from './root.module.scss';

const Root = () => {
  const [game, setGame] = useState<Snakes>();
  const [difficulty, setDifficulty] = useState(Difficulty.PRO);
  const [targetRow, setTargetRow] = useState<TARGET_ROW>();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showHighScoreDialog, setShowHighScoreDialog] = useState(false);
  usePreload();

  const renderCards = useMemo(
    () =>
      Array.from(Array(difficulty), () =>
        Array.from(Array(ROW_LENGTH), (_, key) => <Card key={key} hidden />)
      ),
    [difficulty]
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Snakes</Navbar.Heading>
          <Navbar.Divider />
          <Button text="New Game" minimal />
          <Button
            text="High Scores"
            onClick={() => setShowHighScoreDialog(true)}
            minimal
          />
          <Button text="Help" onClick={() => setShowHelpDialog(true)} minimal />
        </Navbar.Group>
      </Navbar>
      <div className={styles.Game}>
        {renderCards.map((row, key) => (
          <div key={key}>{row}</div>
        ))}
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
