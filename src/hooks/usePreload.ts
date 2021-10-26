import useCacheImages from './useCacheImages';
import useHighScores from './useHighScores';

const usePreload = () => {
  useCacheImages();
  useHighScores();
};

export default usePreload;
