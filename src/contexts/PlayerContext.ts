import { createContext, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  shuffleList: number[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void,
  playPrevious: () => void,
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  hasPreviousShuffleList: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

export const usePlayer = () => {
  return useContext(PlayerContext);
}
