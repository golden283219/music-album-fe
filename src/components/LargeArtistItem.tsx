import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Artist } from '../models';
import { selectAlbumAsPlaylist, setPlayStatus } from '../redux/actions';
import { composeAlbumImagePath } from '../common';
import { selectCurrentTrack, selectPlayStatus } from '../redux/selectors';
import { PlayStatus } from '../redux/store';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import ArtistImage from '../assets/images/artist.png';

interface Props {
    artist: Artist;
}

export default function LargeAlbumItem(props: Props) {
    const dispatch = useDispatch();
    const currentTrack = useSelector(selectCurrentTrack);
    const playStatus = useSelector(selectPlayStatus);
    return (
        <Card>
            <div className="position-relative d-flex">
                <CardImg top
                         src={ArtistImage}
                         alt="artist"/>
            </div>
            <CardBody>
                <CardTitle>
                    <NavLink to={`/all-releases/artist/${props.artist != null ? props.artist.slug : ''}/s/GRID/p/0`} className="genre-link">{props.artist != null ? props.artist.name : '' }</NavLink>
                </CardTitle>
            </CardBody>
        </Card>
    );
}
