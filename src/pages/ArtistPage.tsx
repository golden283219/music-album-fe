import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { artistCountPerPage } from '../consts';
import { selectCurrentPage, selectPageCount, selectSearchModeValue, selectArtists } from '../redux/selectors';
import { setCurrentPage, requestArtistSearch } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import ArtistsGridView from '../components/ArtistsGridView';


export default function ArtistPage() {

    const artists = useSelector(selectArtists);
    let { keyword, page } = useParams();
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const searchModeValue = useSelector(selectSearchModeValue);

    const pageCount = useSelector(selectPageCount);
    if (page && +page >= pageCount) {
        page = '0';
    }
    useEffect(() => {
        page && dispatch(setCurrentPage(+page));
    }, [page, dispatch]);

    useEffect(() => {
        dispatch(requestArtistSearch(keyword?keyword:'', currentPage * artistCountPerPage, artistCountPerPage));
    }, [dispatch, keyword, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [ artists ]);

    return (
        <div className="page">

            <div className="d-flex justify-content-between">
                <p className="page-title">ARTISTS</p>

            </div>
            <ArtistsGridView artists={artists}/>

            < div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
