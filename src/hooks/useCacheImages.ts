import { useEffect } from 'react';

const cacheImages = async () => {
  const promises = [...Array(4)]
    .map((_, suit) =>
      [...Array(13)].map(
        (__, cardName) =>
          new Promise((resolve, reject) => {
            const img = new Image();

            img.src = `/cards/${suit}/${cardName}.svg`;
            img.onload = resolve;
            img.onerror = reject;
          })
      )
    )
    .flat();

  await Promise.all(promises);
};

const useCacheImages = () => {
  useEffect(() => {
    cacheImages();
  }, []);
};

export default useCacheImages;
