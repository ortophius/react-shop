import { AddressForm } from '@/features/address-form';
import { PaymentCardForm } from '@/features/payment-card-form';
import { UserInfo } from '@/features/user-info';
import { orderStepCompleted } from '@/processes/order';
import { useEvent } from 'effector-react';
import styles from './steps.module.scss';

export const UserInfoStep = () => {
  const next = useEvent(orderStepCompleted);
  return (
    <div className={styles.container}>
      <UserInfo onSubmit={next} />
    </div>
  );
};

export const PaymentStep = () => {
  const next = useEvent(orderStepCompleted);
  return (
    <div className={styles.container}>
      <PaymentCardForm onSubmit={next} />
    </div>
  );
};

export const AddressStep = () => {
  const next = useEvent(orderStepCompleted);
  return <AddressForm onSubmit={next} />;
};
