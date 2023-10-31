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
  const scores = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <Dialog
      title="High Scores"
      isOpen={isOpen}
      onClose={onClose}
      style={{
        width: 'unset',
        maxHeight: 'calc(100vh - 50px)',
        padding: 0,
      }}
    >
      <div
        className={Classes.DIALOG_BODY}
        style={{ overflow: 'scroll', borderRadius: '6px' }}
      >
        {loading ? (
          <Spinner />
        ) : scores.length === 0 ? (
          'No scores yet, be the first to get on the scoreboard!'
        ) : (
          <HTMLTable
            bordered
            style={{
              fontSize: '16px',
              background: 'rgb(249, 250, 250)',
            }}
          >
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
