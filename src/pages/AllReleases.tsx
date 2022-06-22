import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectCurrentPage, selectPageCount, selectTracks } from '../redux/selectors';
import { requestAllAlbums, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import AlbumsGridView from '../components/AlbumsGridView';
import TracksListView from '../components/TracksListView';
import ShowModeSwitcher from '../components/ShowModeSwitcher';

export default function AllReleases() {
    const albums = useSelector(selectAllAlbumList);
    const tracks = useSelector(selectTracks);
    let { publisherSlug, artistSlug, showMode, page, bpmlow, bpmhigh, key, genre, label, artist } = useParams();

    let title = 'All releases';
    if(publisherSlug){
        title = albums[0]?.publisher.name;
    }
    if(artistSlug){
        title = albums[0]?.artist.name;
    }
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const pageCount = useSelector(selectPageCount);
    if (page && +page >= pageCount) {
        page = '0';
    }
    useEffect(() => {
        if (showMode === ShowMode.GRID || showMode === ShowMode.LIST) {
            dispatch(setShowMode(showMode));
        }
    }, [showMode, dispatch]);

    useEffect(() => {
        page && dispatch(setCurrentPage(+page));
    }, [page, dispatch]);

    useEffect(() => {
        if (publisherSlug !== undefined) {
            dispatch(setShowMode(ShowMode.GRID));
        }
    }, [publisherSlug, dispatch]);

    useEffect(() => {
        if (artistSlug !== undefined) {
            dispatch(setShowMode(ShowMode.GRID));
        }
    }, [artistSlug, dispatch]);

    useEffect(() => {
        
        if (showMode === ShowMode.GRID) {
            dispatch(requestAllAlbums(currentPage * albumCountPerPage, albumCountPerPage, publisherSlug || '', artistSlug || ''));
        } else {
            dispatch(requestTracks('', currentPage * trackCountPerPage, trackCountPerPage, publisherSlug || '', artistSlug || '', bpmlow, bpmhigh, key, genre, label, artist));
        }
    }, [showMode, publisherSlug, artistSlug, dispatch, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums]);

    return (
        <div className="page">
            <div className="d-flex">
                <p className="page-title">{title}
                </p>
            </div>
            <ShowModeSwitcher/>
            { showMode === ShowMode.GRID?<AlbumsGridView albums={albums}/>:<TracksListView tracks={tracks}/> }
            <div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
