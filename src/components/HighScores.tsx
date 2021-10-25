/* eslint-disable no-nested-ternary */
import { Dialog, Classes, Spinner, HTMLTable } from '@blueprintjs/core';
import useHighScores from '../hooks/useHighScores';

const HighScores = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => {
  const { data, loading } = useHighScores();
  const scores = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      style={{ width: 'unset', paddingBottom: 0 }}
    >
      <div className={Classes.DIALOG_BODY}>
        {loading ? (
          <Spinner />
        ) : scores.length === 0 ? (
          'No scores yet, be the first to get on the scoreboard!'
        ) : (
          <HTMLTable style={{ fontSize: '30px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(([name, score], key) => (
                <tr key={key}>
                  <td>{name}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        )}
      </div>
    </Dialog>
  );
};

export default HighScores;
