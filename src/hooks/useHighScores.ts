import useSWR, { useSWRConfig } from 'swr';

interface ScoreFormData {
  name: string;
  score: number;
}

type Scores = Record<string, number>;

const prepareFormData = ({ name, score }: ScoreFormData) => {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('score', `${score}`);

  return formData;
};

const get = () =>
  fetch('https://snakes-worker.beemr.workers.dev').then((res) => res.json());

const post = (formData: ScoreFormData) =>
  fetch('https://snakes-worker.beemr.workers.dev', {
    method: 'POST',
    body: prepareFormData(formData),
  }).then((res) => res.json());

const PATH = '/';

const useHighScores = () => {
  const { mutate: libMutate } = useSWRConfig();
  const { data, error } = useSWR<Scores>(PATH, get);

  const mutate = (formData: ScoreFormData) =>
    libMutate(PATH, post(formData), false);

  return {
    data: data ?? {},
    mutate,
    error,
    loading: !error && !data,
  };
};

export default useHighScores;
