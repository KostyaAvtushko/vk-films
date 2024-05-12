import { IFilm } from "../entities/film/model/models";
import { TMDB_API_KEY } from "./globals";

export async function fetchFilm<T extends string | number>(type: T, page?: number): Promise<T extends string ? IFilm[] : IFilm>{
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US` + `${page && `&page=${page}`}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  };

  return await fetch(url, options)
    .then(res => res.json())
    .then(res => page ? res.results : res)
    .catch(err => console.error('error:' + err));
}

export const fetchPopularFilms = async (page: number): Promise<IFilm[]> => {
  return (await fetchFilm('popular', page));
}

export const fetchTopRatedFilms = async (page: number): Promise<IFilm[]> => {
  return (await fetchFilm('top_rated', page));
}

export const fetchSimilarFilms = async (id: string): Promise<IFilm[]> => {
  return (await fetchFilm(`${id}/similar`, 1));
}