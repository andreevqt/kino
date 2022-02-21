import axios, { AxiosError } from 'axios';
import { store } from '../store';
import { decode } from '../jwt';
import { refresh } from '../slices/user';

const BASE_URL = 'https://api.kino-reaction.ru';

const isExpired = (token: string) => {
  const splited = token.split(' ')[1];
  const { exp } = decode(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const requests = {
  public: axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }),

  private: axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
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
      return config;
    }

    await store.dispatch(refresh());

    const newAccessToken = store?.getState()?.user.accessToken;
    if (!newAccessToken) {
      throw new axios.Cancel('No access token present');
    }

    if (config?.headers) {
      config.headers['authorization'] = newAccessToken;
    }

    return config;
  },
  (err) => {
    if (axios.isCancel(err)) {
      return;
    }

    return Promise.reject(err);
  }
);

requests.public.interceptors.response.use((response) => response, errorHandler);
requests.private.interceptors.response.use((response) => response, errorHandler);

export default requests;
