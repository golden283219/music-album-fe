import axios, { AxiosResponse } from 'axios';
import { API_FETCH_KEYS } from './apis';
import { Key } from '../models';
import { environment } from '../environments/envrionment';

interface KeysResponse {
    keys: Key[];
}

export const apiFetchKeys = async() => {
    
    const result: AxiosResponse<KeysResponse> = await axios(environment.API_URL + API_FETCH_KEYS);
    return result.data.keys;
};
