import { Select } from '@/shared/ui/components/select/select';
import { Input } from '@/shared/ui/components/input';
import {
  cardHolderPlaceHolder,
  cardNumberPlaceholder,
  currentMonth,
  currentYear,
  defaultCardInfo,
  formatCardNumber,
  getVendorLogo,
  monthsItems,
  numberRegex,
  yearsAray,
} from './lib';
import styles from './payment-card-form.module.scss';
import { FormEvent, useMemo, useState } from 'react';
import creditCardType from 'credit-card-type';
import clsx from 'clsx';
import { Button } from '@/shared/ui/components/button';

type PaymentCardFormPayload = {
  number: string;
  name: string;
  date: {
    month: number;
    year: number;
  };
  code: string;
};

type PaymentCardFormProps = {
  onSubmit: (payload: PaymentCardFormPayload) => void;
};

export const PaymentCardForm = ({ onSubmit }: PaymentCardFormProps) => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [number, setNumber] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const [name, setName] = useState('');
  const [flip, setFlip] = useState(false);
  const [code, setCode] = useState('');

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const payload = {
      number,
      name,
      date: {
        month,
        year,
      },
      code,
    };
    onSubmit(payload);
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    if (value === currentYear && month < currentMonth) setMonth(currentMonth);
  };

  const handleMonthChange = (value: number) => {
    setMonth(value);
  };

  const handleNumberChange = ({
    currentTarget,
    currentTarget: { value, selectionStart },
  }: FormEvent<HTMLInputElement>) => {
    const nextValue = value.replace(numberRegex, '');
    if (number === nextValue) return;
    const caret = currentTarget.selectionEnd || 0;
    if (caret < currentTarget.value.length)
      window.requestAnimationFrame(() => {
        currentTarget.selectionStart = currentTarget.selectionEnd = caret;
      });
    setNumber(nextValue);
    setDisplayNumber(formatCardNumber(nextValue));
  };

  const handleCodeChange = ({
    currentTarget: { value },
  }: FormEvent<HTMLInputElement>) => {
    setCode(value.replace(numberRegex, ''));
  };

  const months = useMemo(() => {
    return year === currentYear
      ? monthsItems.slice(currentMonth - 1)
      : monthsItems;
  }, [year]);

  const VendorLogo = useMemo(
    () => getVendorLogo(creditCardType(number)[0]?.type || 'unknown'),
    [number]
  );

  const cardInfo = useMemo(
    () => creditCardType(number)[0] || defaultCardInfo,
    [number]
  );

  const cardNumMaxLen = useMemo(
    () => cardInfo.lengths[cardInfo.lengths.length - 1] + cardInfo.gaps.length,
    [cardInfo]
  );

  const cardNumberPattern = useMemo(
    () =>
      `[\\s0-9]{${cardInfo.lengths[0] + cardInfo.gaps.length},${
        cardInfo.lengths[cardInfo.lengths.length - 1] + cardInfo.gaps.length
      }}`,
    [cardInfo]
  );

  const holderPattern = '[A-z]{1,}[\\s]{1}[A-z]{1,}';

  return (
    <div className={styles['card-form']}>
      <div className={styles.title}>Данные карты</div>

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <Input
          className={styles.number}
          placeholder="Номер карты"
          value={displayNumber}
          onChange={handleNumberChange}
          maxLength={cardNumMaxLen}
          required
          pattern={cardNumberPattern}
        />
        <Input
          className={styles.name}
          placeholder="Имя владельца карты"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          pattern={holderPattern}
          required
        />
        <div className={styles.date}>
          <span className={styles.label}>Срок действия</span>
          <Select
            items={months}
            onChange={handleMonthChange}
            value={month}
            controlled
          />
          /
          <Select
            items={yearsAray.map((i) => ({
              title: i.toString(),
              value: i,
            }))}
            defaultItemIndex={4}
            onChange={handleYearChange}
            value={year}
            controlled
          />
        </div>
        <div className={styles.cvv}>
          <span className={styles.label}>{cardInfo.code.name}</span>
          <Input
            type="text"
            className={styles['cvv-input']}
            maxLength={cardInfo.code.size}
            value={code}
            onChange={handleCodeChange}
            onFocus={() => {
              setFlip(true);
            }}
            onBlur={() => {
              setFlip(false);
            }}
            required
          />
        </div>
        <Button className={styles.submit} type="submit">
          Далее
        </Button>
      </form>
      <div className={clsx(styles.card, { [styles.flip]: flip })}>
        <div className={styles['card-content']}>
          <div className={styles.front}>
            <div className={styles['card-logo']}>
              <VendorLogo />
            </div>
            <div className={styles['card-number']}>
              {displayNumber || cardNumberPlaceholder}
            </div>
            <div className={styles['card-holder']}>
              {name || cardHolderPlaceHolder}
            </div>
            <div className={styles['card-holder']}>
              {monthsItems[month - 1].title} / {year}
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles['card-code']}>{code}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
