import { useTheme } from '../../contexts/ThemeContext';

import styles from './styles.module.scss';

export function ThemeSwitcher() {
  const { toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <input
        id='switch'
        type='checkbox'
        name='theme'
        className={styles.switch}
        onChange={toggleTheme}
      />
      <label htmlFor='switch' className={styles.label}>
        Toggle
      </label>
    </div>
  );
}
