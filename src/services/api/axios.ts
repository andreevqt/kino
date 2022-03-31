import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { decode } from '../jwt';
import * as api from '.';

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
    const accessToken = Cookie.get('accessToken');
    if (accessToken && !isExpired(accessToken)) {
      if (config.headers) {
        config.headers['authorization'] = accessToken;
      }

      return config;
    }

    try {
      const refreshToken = Cookie.get('refreshToken');
      if (!refreshToken) {
        throw Error('Wrong or missing token');
      };

      const { access, refresh } = await api.user.refresh(refreshToken);
      Cookie.set('accessToken', access);
      Cookie.set('refreshToken', refresh);

      if (config.headers) {
        config.headers['authorization'] = access;
      }

      return config;
    } catch (err) {
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      return config;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

requests.public.interceptors.response.use((response) => response, errorHandler);
requests.private.interceptors.response.use((response) => response, errorHandler);

export default requests;
