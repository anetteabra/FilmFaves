import axios from 'axios';

const API_KEY = '2fa6f2c81a648e6acc45671fd42af453';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviePoster = async (movieId: number) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  };

