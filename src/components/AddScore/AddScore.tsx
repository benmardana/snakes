import { useState } from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import OtpInput from 'react-otp-input-rc-17';

import useHighScores from '../../hooks/useHighScores';
import { showToast } from '../../utils/toaster';
import styles from './addscore.module.scss';

const AddScore = ({
  score,
  onClose,
  isOpen,
}: {
  score: number;
  onClose: () => void;
  isOpen?: boolean;
}) => {
  const { mutate } = useHighScores();
  const [intials, setInitials] = useState('');
  const [saving, setSaving] = useState(false);

  const handleOnSave = async () => {
    setSaving(true);
    try {
      await mutate({ name: intials, score });
      setSaving(false);
      onClose();
    } catch (error) {
      // pop a toast with the error message
      if (error instanceof Error) {
        showToast({
          message: 'Error saving score, please try again',
          intent: Intent.DANGER,
          timeout: 2000,
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="New Score"
      isOpen={isOpen}
      onClose={onClose}
      style={{ paddingBottom: 0 }}
    >
      <div style={{ textAlign: 'center' }} className={Classes.DIALOG_BODY}>
        <h1>Great score!</h1>
        <h2>Points: {score}</h2>
        <p>Enter your name or initials</p>
        <p>Press Save when finished</p>
        <OtpInput
          value={intials}
          onChange={(value: string) => setInitials(value.toUpperCase())}
          containerStyle={styles.InputContainer}
          inputStyle={styles.Input}
          numInputs={3}
          placeholder="AAA"
        />
        <Button
          onClick={handleOnSave}
          disabled={intials.length !== 3}
          intent={Intent.PRIMARY}
          loading={saving}
          large
          fill
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default AddScore;
