import { $currentStep } from '@/processes/order';
import { Header } from '@/widgets/header';
import { useStore } from 'effector-react';
import { renderOrderStep } from './lib';
import styles from './order.module.scss';
import { Roadmap } from './ui/roadmap/roadmap';

export const OrderPage = () => {
  const currentStep = useStore($currentStep);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles['step-info']}>
          <div className={styles.title}>Оформление заказа</div>
          <Roadmap />
        </div>
        <div>{renderOrderStep(currentStep)}</div>
      </main>
    </>
  );
};
