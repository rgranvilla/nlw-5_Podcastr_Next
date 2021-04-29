import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

import * as themes from '../styles/themes';

type ThemeContextProviderProps = {
  children: ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(themes.light);
  const [mounted, setMounted] = useState(false);

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

  useEffect(() => {
    async function changeTheme() {
      await newTheme();
    }

    const newTheme = () => {
      if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{body}</div>;
      } else {
        const html = document.querySelector('html');

        const transformKey = (key) =>
          `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

        const changeColors = (colors) => {
          Object.keys(colors).map((key) => {
            html.style.setProperty(transformKey(key), colors[key]);
            console.log(transformKey(key), colors[key]);
          });
        };
        changeColors(theme);
      }
    };
    changeTheme();
  }, [theme]);

  return body;
}
