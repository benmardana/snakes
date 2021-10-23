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
    <Dialog title="High scores" isOpen={isOpen} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>
        {loading ? (
          <Spinner />
        ) : (
          <HTMLTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([name, score]) => (
                <tr>
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
