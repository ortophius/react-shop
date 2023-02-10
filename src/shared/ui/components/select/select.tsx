import { useState } from 'react';
import { light } from '../button/button.module.scss';
import { Dimmer } from '../dimmer';
import styles from './select.module.scss';

type Item = {
  title: string;
  value: string;
};

type SelectProps = {
  items: Item[];
  defaultItemIndex?: number;
  onChange: (value: string) => void;
};

export const Select = ({
  items,
  defaultItemIndex = 0,
  onChange,
}: SelectProps) => {
  const [current, setCurrent] = useState<Item>(items[defaultItemIndex]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (item: Item) => {
    onChange(item.value);
    setCurrent(item);
    setShowDropdown(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.select}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {current.title}
      </div>
      {showDropdown && (
        <>
          <Dimmer onClick={() => setShowDropdown(false)} />
          <div className={styles.dropdown}>
            <ul className={styles.list}>
              {items.map((item) => (
                <li onClick={() => handleChange(item)} key={item.value}>
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
