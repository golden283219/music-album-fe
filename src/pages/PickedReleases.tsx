import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { albumCountPerPage, trackCountPerPage } from '../consts';
import { ShowMode } from '../redux/store';
import { selectAllAlbumList, selectCurrentPage, selectPageCount, selectTracks } from '../redux/selectors';
import { requestPickedAlbums, requestTracks, setCurrentPage, setShowMode } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import AlbumsGridView from '../components/AlbumsGridView';
import { titleCase } from '../utils';
import ShowModeSwitcher from '../components/ShowModeSwitcher';
import TracksListView from '../components/TracksListView';

interface Props {
  type: string;
}

export default function PickedReleases(props: Props) {
  const albums = useSelector(selectAllAlbumList);
  const tracks = useSelector(selectTracks);
  let { publisherSlug, artistSlug, showMode, page, bpmlow, bpmhigh, key, genre, label, artist, keyword } = useParams();
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
    
    if (showMode === ShowMode.GRID) {
      dispatch(requestPickedAlbums(props.type, currentPage * albumCountPerPage, albumCountPerPage, publisherSlug || ''));
  } else {
      dispatch(requestTracks(props.type, currentPage * trackCountPerPage, trackCountPerPage, keyword, publisherSlug || '', artistSlug ||'', bpmlow, bpmhigh, key, genre, label, artist));
  }
  }, [showMode, publisherSlug, dispatch, currentPage, props.type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [albums, tracks]);

  return (
    <div className="page">
      <div className="d-flex justify-content-between">
        <p className="page-title">{titleCase(props.type)}</p>
      </div>
      <ShowModeSwitcher/>
      { showMode === ShowMode.GRID?<AlbumsGridView albums={albums}/>:<TracksListView tracks={tracks}/> }
      <div className="d-flex justify-content-center align-items-center">
        <AlbumPagination/>
      </div>
    </div>
  );
}
