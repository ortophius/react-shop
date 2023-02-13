import { Button } from '@/shared/ui/components/button';
import { Dimmer } from '@/shared/ui/components/dimmer';
import { useEvent, useStore } from 'effector-react';
import { useRef } from 'react';
import {
  $suggestedAddress,
  suggestionAccepted,
  suggestionClosed,
} from '../model';
import styles from './address-confirm.module.scss';

export const AddressConfirm = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const address = useStore($suggestedAddress);
  const accept = useEvent(suggestionAccepted);
  const close = useEvent(suggestionClosed);

  return (
    <div className={styles.confirm} ref={popupRef}>
      <Dimmer el={popupRef} onClick={close} />
      <div className={styles.address}>
        {address?.locality}, {address?.street}, {address?.house}
      </div>
      <div className={styles.promt}>Это верный адрес?</div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            accept();
            close();
          }}
        >
          Да, всё верно
        </Button>
        <Button onClick={close}>Нет</Button>
      </div>
    </div>
  );
};
