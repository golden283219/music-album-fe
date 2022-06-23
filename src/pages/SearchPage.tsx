import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { albumCountPerPage, trackCountPerPage, artistCountPerPage, labelCountPerPage } from '../consts';
import { selectAllAlbumList, selectCurrentPage, selectPageCount, selectSearchModeValue, selectTracks, selectArtists, selectLabels } from '../redux/selectors';
import { requestSearch, requestAlbumSearch, setCurrentPage, requestArtistSearch, requestLabelSearch } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import TracksListView from '../components/TracksListView';
import AlbumsGridView from '../components/AlbumsGridView';
import ArtistsGridView from '../components/ArtistsGridView';
import LabelsGridView from '../components/LabelsGridView';

export default function SearchPage() {
    const albums = useSelector(selectAllAlbumList);
    const tracks = useSelector(selectTracks);
    const artists = useSelector(selectArtists);
    const labels = useSelector(selectLabels);
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
        dispatch(requestLabelSearch(keyword?keyword:'', currentPage * labelCountPerPage, labelCountPerPage));
        dispatch(requestAlbumSearch(keyword?keyword:'', currentPage * albumCountPerPage, albumCountPerPage));
        dispatch(requestSearch(keyword?keyword:'', currentPage * trackCountPerPage, trackCountPerPage));
    }, [dispatch, keyword, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [tracks, albums, artists, labels]);

    return (
        <div className="page">
            <div className="d-flex justify-content-between">
                <p className="page-title">SEARCH RESULTS</p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="page-subtitle">RELEASES</p>
                <a href={`/all-releases/search/${keyword}/s/GRID/p/0`} className='view-more'>View All</a>
            </div>
            <AlbumsGridView albums={albums.length > 6 ?albums.slice(0, 5): albums}/>
            <div className="d-flex justify-content-between">
                <p className="page-subtitle">TRACKS</p>
                <a href={`/all-releases/search/${keyword}/s/LIST/p/0`} className='view-more'>View All</a>
            </div>
            <TracksListView tracks={tracks.length > 6 ?tracks.slice(0, 5): tracks}/>
            <div className="d-flex justify-content-between">
                <p className="page-subtitle">ARTISTS</p>
                <a href={`/artist/${keyword}/p/0`} className='view-more'>View All</a>
            </div>
            <ArtistsGridView artists={artists.length > 6 ?artists.slice(0, 5): artists}/>
            <div className="d-flex justify-content-between">
                <p className="page-subtitle">LABELS</p>
                <a href={`/label/${keyword}/p/0`} className='view-more'>View All</a>
            </div>
            <LabelsGridView labels={labels.length > 6 ?labels.slice(0, 5): labels}/>
        </div>
    );
}
