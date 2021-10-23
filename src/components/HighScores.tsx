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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      style={{ width: 'unset', paddingBottom: 0 }}
    >
      <div className={Classes.DIALOG_BODY}>
        {loading ? (
          <Spinner />
        ) : (
          <HTMLTable style={{ fontSize: '30px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data)
                .slice(0, 10)
                .map(([name, score], key) => (
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
