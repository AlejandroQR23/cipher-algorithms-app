import { axiosInstance, responseInterceptor } from './axiosInstance';

export interface Algorithm {
  name: string;
  description: string;
  type: string;
  key_size: number;
}

const algorithmRequests = {
  get: (url: string) => axiosInstance.get<Algorithm>(url).then(responseInterceptor),
};

export const algorithmAPI = {
  getAlgorithms: (): Promise<Algorithm[]> => algorithmRequests.get('algorithms'),
  getAlgorithmsByType: (type: string): Promise<Algorithm[]> => algorithmRequests.get(`/algorithms/?type=${type}`),
};
