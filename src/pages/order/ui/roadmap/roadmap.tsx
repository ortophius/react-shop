import { $currentStepIndex } from '@/processes/order';
import { orderFlow } from '@/processes/order/model';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import styles from './roadmap.module.scss';

export const Roadmap = () => {
  const stepIndex = useStore($currentStepIndex);

  return (
    <div className={styles.roadmap}>
      {orderFlow.map((step, index) => (
        <>
          {index > 0 && (
            <span
              className={clsx(styles.delimeter, {
                [styles.filled]: stepIndex >= index,
              })}
              key={`${index}-delim`}
            />
          )}
          <span
            className={clsx(styles.label, {
              [styles.current]: index === stepIndex,
            })}
            key={index}
          >
            Шаг {index + 1}
          </span>
        </>
      ))}
    </div>
  );
};
