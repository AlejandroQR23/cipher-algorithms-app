import { axiosInstance, responseInterceptor } from './axiosInstance';

export interface Algorithm {
  name: string;
  description: string;
  type: string;
  key_size: number;
}

export interface Results {
  difference: number;
  time: number;
  winner: string;
  loser: string;
}

export interface CompareResults {
  best_decryption?: Results;
  best_encryption: Results;
}

interface CompareQuery {
  algo1: string;
  algo2: string;
  iterations?: number;
  data?: string;
}

const algorithmRequests = {
  get: (url: string) => axiosInstance.get<Algorithm>(url).then(responseInterceptor),
};

const buildQuery = (params: any): string => {
  const { algo1, algo2, iterations, data } = params;
  let url = `/algorithms/compare?algo1=${algo1}&algo2=${algo2}`;
  if (iterations) {
    url += `&iterations=${iterations}`;
  }
  if (data) {
    url += `&data=${data}`;
  }

  return url;
};

export const algorithmAPI = {
  getAlgorithms: (): Promise<Algorithm[]> => algorithmRequests.get('algorithms'),
  getAlgorithmsByType: (type: string): Promise<Algorithm[]> => algorithmRequests.get(`/algorithms/?type=${type}`),
  compareAlgorithms: (params: CompareQuery): Promise<CompareResults> => algorithmRequests.get(buildQuery(params)),
};
