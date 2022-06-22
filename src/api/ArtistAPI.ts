import axios, { AxiosResponse } from 'axios';
import { API_FETCH_ARTISTS, API_FETCH_ARTIST_SEARCH } from './apis';
import { Artist } from '../models';
import { environment } from '../environments/envrionment';

interface ArtistsResponse {
    artists: Artist[];
    artistCount: number;
}

export const apiFetchArtists = async() => {
    
    const result: AxiosResponse<ArtistsResponse> = await axios(environment.API_URL + API_FETCH_ARTISTS);
    return result.data.artists;
};

export const apiFetchArtistSearch = async (skip: number, limit: number, keyword: string) => {
    const result: AxiosResponse<ArtistsResponse> = await axios(environment.API_URL + API_FETCH_ARTIST_SEARCH + '?keyword=' + keyword + '&skip=' + skip + '&limit=' + limit);
    return [result.data.artists, result.data.artistCount];
};
