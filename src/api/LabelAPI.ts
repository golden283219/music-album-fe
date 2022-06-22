import axios, { AxiosResponse } from 'axios';
import { API_FETCH_LABELS, API_FETCH_LABEL_SEARCH } from './apis';
import { Publisher } from '../models';
import { environment } from '../environments/envrionment';

interface LabelsResponse {
    labels: Publisher[];
    labelCount: number;
}

export const apiFetchLabels = async() => {
    
    const result: AxiosResponse<LabelsResponse> = await axios(environment.API_URL + API_FETCH_LABELS);
    return result.data.labels;
};

export const apiFetchLabelSearch = async (skip: number, limit: number, keyword: string) => {
    const result: AxiosResponse<LabelsResponse> = await axios(environment.API_URL + API_FETCH_LABEL_SEARCH + '?keyword=' + keyword + '&skip=' + skip + '&limit=' + limit);
    return [result.data.labels, result.data.labelCount];
};