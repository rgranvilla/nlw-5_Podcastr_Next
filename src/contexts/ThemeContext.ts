import {createContext, useContext} from 'react';

export type ThemeContextData = {
  theme: {
    background: string;
    bgMain: string;
    bgHeader: string;
    bgCardEpisode: string;
    bgButton: string;
    bgPlayerPanel: string;
    bgDisableContainerImage: string;
    mainTitleColor: string;
    mainTextColor: string;
    secondaryTextColor: string;
    playerTextColor: string;
    borderColor: string;
    borderPlayerContainerColor: string;
  }
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData);

export const useTheme = () => {
  return useContext(ThemeContext);
}