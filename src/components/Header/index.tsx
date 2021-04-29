import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';
import { ThemeSwitcher } from '../ThemeSwitcher';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src='logo_dark.svg' alt='Podcastr' />

      <p>O melhor para você ouvir, sempre</p>

      <div className={styles.leftStatus}>
        <span>{currentDate}</span>
        <div className={styles.switcher}>
          <img src='light-side.svg' alt='Tema Light' />
          <ThemeSwitcher />
          <img src='dark-side.svg' alt='Tema Dark' />
        </div>
      </div>
    </header>
  );
}
