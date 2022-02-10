import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.kino-reaction.ru',
  headers: { 'Content-Type': 'application/json' }
});
