import { useMemo, useState } from 'react';
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
    <div className={styles.Root}>
      <h1>Snakes</h1>
      <div>
        {renderCards.map((row) => (
          <div>{row}</div>
        ))}
      </div>
    </div>
  );
};

export default Root;
