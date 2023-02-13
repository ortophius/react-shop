import { Button } from '@/shared/ui/components/button';
import { Input } from '@/shared/ui/components/input';
import { useRef } from 'react';
import styles from './user-info.module.scss';

type UserInfoPayload = {
  name: string;
  email: string;
};

type UserInfoProps = {
  onSubmit: (e: UserInfoPayload) => void;
};

export const UserInfo = ({ onSubmit }: UserInfoProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const inputs = formRef.current.querySelectorAll('input');
    onSubmit({ name: inputs[0].value, email: inputs[1].value });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles['user-info']}>
      <div className={styles.title}>Данные получателя</div>
      <label htmlFor="user-info.name">Имя и фамилия</label>
      <Input
        id="user-info.name"
        type="text"
        maxLength={24}
        name="name"
        required
      />
      <label htmlFor="user-info.email">Email</label>
      <Input
        id="user-info.email"
        type="email"
        maxLength={24}
        name="email"
        required
      />
      <Button type="submit" className={styles.submit}>
        Далее
      </Button>
    </form>
  );
};
