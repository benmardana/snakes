import { useMemo, useState } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import Snakes from './lib';
import Card from './components/Card';
import { Difficulty, ROW_LENGTH, TARGET_ROW } from './lib/Snakes';
import styles from './root.module.scss';

const Root = () => {
  const [game, setGame] = useState<Snakes>();
  const [difficulty, setDifficulty] = useState(Difficulty.PRO);
  const [targetRow, setTargetRow] = useState<TARGET_ROW>();

  const renderCards = useMemo(
    () =>
      Array.from(Array(difficulty), () =>
        Array.from(Array(ROW_LENGTH), () => <Card hidden />)
      ),
    [difficulty]
  );

  return (
    <div style={{ height: '100%' }}>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Snakes</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp4-minimal" text="New Game" />
          <Button className="bp4-minimal" text="High Scores" />
          <Button className="bp4-minimal" text="Help" />
        </Navbar.Group>
      </Navbar>
      <div className={styles.Game}>
        {renderCards.map((row) => (
          <div>{row}</div>
        ))}
      </div>
    </div>
  );
};

export default Root;
