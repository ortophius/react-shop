import { useRef, useState } from 'react';
import { light } from '../button/button.module.scss';
import { Dimmer } from '../dimmer';
import styles from './select.module.scss';

type Item<T extends any> = {
  title: string;
  value: T;
};

interface SelectProps<T> {
  items: Item<T>[];
  defaultItemIndex?: number;
  onChange: (value: T) => void;
  value?: T;
  controlled?: boolean;
}

export const Select: <T extends any>(props: SelectProps<T>) => JSX.Element = ({
  items,
  defaultItemIndex = 0,
  onChange,
  value,
  controlled = false,
}) => {
  const [current, setCurrent] = useState(items[defaultItemIndex]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (item: Item<any>) => {
    onChange(item.value);
    if (!controlled) setCurrent(item);
    setShowDropdown(false);
  };

  const getItemByValue = (v: string) => items.find(({ value }) => value === v);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.select}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {controlled ? getItemByValue(value as string)?.title : current.title}
      </div>
      {showDropdown && (
        <>
          <Dimmer el={containerRef} onClick={() => setShowDropdown(false)} />
          <div className={styles.dropdown}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li onClick={() => handleChange(item)} key={`${item.value}`}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
