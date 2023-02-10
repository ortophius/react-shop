import styles from './checkbox.module.scss';

type CheckboxProps = {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox = ({ label, value, onChange }: CheckboxProps) => (
  <div className={styles.checkbox}>
    <label className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => {
          onChange(checked);
        }}
      />
      <span className={styles.icon}>{value && <i className="icon-ok" />}</span>
      {label}
    </label>
  </div>
);
