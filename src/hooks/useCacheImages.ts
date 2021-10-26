import { useEffect } from 'react';

const cacheImages = () => {
  [...Array(4)].forEach((_, suit) =>
    [...Array(13)].forEach((__, cardName) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = `/cards/${suit}/${cardName}.svg`;
      link.as = 'image';

      document.head.append(link);
    })
  );
};

const useCacheImages = () => {
  useEffect(() => {
    cacheImages();
  }, []);
};

export default useCacheImages;
