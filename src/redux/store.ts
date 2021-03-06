import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers';
import appSaga from './sagas';
import { Album, Category, DetailAlbum, Track, Key, Artist, Publisher } from '../models';
import { Premium, UserInfo } from '../types';

export enum PlayStatus {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED = 'PAUSED'
}

export enum ShowMode {
    GRID = 'GRID',
    LIST = 'LIST'
}

export enum LoadingState {
    LOADING = 'LOADING',
    LOADED = 'LOADED'
}

export const initialState: StoreState = {
    showMode: ShowMode.GRID,
    currentTrackSlug: '',
    playList: [],
    playStatus: PlayStatus.STOPPED,
    allAlbumList: [],
    featuredAlbumList: [],
    tracks: [],
    artists: [],
    labels: [],
    topAlbums: [],
    loadingState: LoadingState.LOADED,
    categories: [],
    keys: [],
    muted: false,
    pageCount: 0,
    currentPage: 0,
    loggedIn: false,
    loginErrorMessage: '',
    downloadErrorMessage: '',
    hasDownloadError: false,
    wideScreen: false,
    searchModeValue: '',
    userInfo: {
        downloadLimit: 0,
        downloadedData: 0,
        specialDownloadLimit: 0,
        specialDownloadedData: 0,
        email: '',
        admin: 0,
        name: '',
        expirationDate: 0
    },
    premium: Premium.PREMIUM_30
};

export interface StoreState {
    showMode: ShowMode;
    playList: string[];
    currentTrackSlug: string;
    playStatus: PlayStatus;
    allAlbumList: Album[];
    featuredAlbumList: Album[];
    tracks: Track[];
    artists: Artist[];
    labels: Publisher[];
    currentAlbumDetails?: DetailAlbum;
    currentTrack?: Track;
    topAlbums: Album[];
    loadingState: LoadingState;
    categories: Category[];
    keys: Key[],
    muted: boolean;
    pageCount: number;
    currentPage: number;
    loggedIn: boolean;
    loginErrorMessage: string;
    downloadErrorMessage: string;
    hasDownloadError: boolean;
    userInfo: UserInfo;
    searchModeValue: string;
    wideScreen: boolean;
    premium: Premium;
}

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// Store
export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);
sagaMiddleware.run(appSaga);
