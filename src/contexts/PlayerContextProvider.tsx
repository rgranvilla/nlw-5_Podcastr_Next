import { ReactNode, useState } from 'react';
import { PlayerContext } from './PlayerContext';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleList, setShuffleList] = useState<number[]>([]);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    if (isShuffling) {
      setShuffleList([]);
    }
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
    setShuffleList([]);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasPreviousOnShuffleList = shuffleList.length >= 1;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      let isSameEpisode = true;
      let nextRandomEpisodeIndex = -1;
      while (isSameEpisode) {
        nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
        if (nextRandomEpisodeIndex !== currentEpisodeIndex) {
          isSameEpisode = false;
        }
      }
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      setShuffleList([...shuffleList, currentEpisodeIndex]);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (isShuffling || hasPreviousOnShuffleList) {
      setCurrentEpisodeIndex(shuffleList[shuffleList.length - 1]);
      setShuffleList(shuffleList.slice(0, shuffleList.length - 1));
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        shuffleList,
        currentEpisodeIndex,
        clearPlayerState,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        hasNext,
        hasPrevious,
        hasPreviousOnShuffleList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
