import axios, { AxiosError } from 'axios';
import { store } from '../store';
import { decode } from '../jwt';
import { refresh } from '../slices/user';

const BASE_URL = 'http://localhost:3000';

const isExpired = (token: string) => {
  const splited = token.split(' ')[1];
  const { exp } = decode(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const headers = {
  'Content-Type': 'application/json'
};

const requests = {
  public: axios.create({
    baseURL: BASE_URL,
    headers
  }),

  private: axios.create({
    baseURL: BASE_URL,
    headers
  })
};

const errorHandler = (err: AxiosError) => {
  const { response } = err;
  if (response) {
    return Promise.reject(response.data.message);
  }

  return Promise.reject(err.message);
};

requests.private.interceptors.request.use(
  async (config) => {
    const accessToken = store?.getState()?.user.accessToken;
    if (accessToken && !isExpired(accessToken)) {
      if (config?.headers) {
        config.headers['authorization'] = accessToken;
      }

      return config;
    }

    await store.dispatch(refresh());

    const newAccessToken = store?.getState()?.user.accessToken;
    if (!newAccessToken) {
      return config;
    }

    if (config?.headers) {
      config.headers['authorization'] = newAccessToken;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

requests.public.interceptors.response.use((response) => response, errorHandler);
requests.private.interceptors.response.use((response) => response, errorHandler);

export default requests;
