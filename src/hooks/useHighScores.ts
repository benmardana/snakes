import useSWR from 'swr';

const fetcher = () => fetch('http://127.0.0.1:8787').then((res) => res.json());

const useHighScores = () => {
  const { data, error } = useSWR<Record<string, number>>('/', fetcher);

  return {
    data: data ?? {},
    error,
    loading: !error && !data,
  };
};

export default useHighScores;
