import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import axiosRetry from 'axios-retry';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://api.mvshop.com',
  timeout: 12000,
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) &&
      error.config.method?.toUpperCase() === 'GET'
    );
  },
});

/**
 * Creates a cancellable axios request function with a cancel token.
 *
 * Usage:
 * const { request, cancel } = createCancelableRequest();
 * useEffect(() => {
 *   request({ url: '/endpoint' }).then(...).catch(...);
 *   return () => cancel();
 * }, []);
 *
 * @returns { request: (config: AxiosRequestConfig) => Promise<T>, cancel: () => void }
 */
export function createCancelableRequest<T = any>() {
  const source: CancelTokenSource = axios.CancelToken.source();

  const request = (config: AxiosRequestConfig): Promise<T> => {
    return apiClient({ ...config, cancelToken: source.token });
  };

  return { request, cancel: () => source.cancel('Request cancelled by user') };
}

export default apiClient;
