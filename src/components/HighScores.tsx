/* eslint-disable no-nested-ternary */
import { Dialog, Classes, Spinner, HTMLTable } from '@blueprintjs/core';
import useHighScores from '../hooks/useHighScores';

const HighScores = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen?: boolean;
}) => {
  const { data, loading } = useHighScores();
  const scores = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <Dialog
      title="High Scores"
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
          <HTMLTable bordered style={{ fontSize: '16px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Initials</th>
                <th style={{ textAlign: 'center' }}>High Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(([name, score], key) => (
                <tr key={key}>
                  <td style={{ textAlign: 'center' }}>{name}</td>
                  <td style={{ textAlign: 'center' }}>{score}</td>
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
