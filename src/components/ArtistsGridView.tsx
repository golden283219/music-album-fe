import React from 'react';
import { Artist } from '../models';
import LargeArtistItem from './LargeArtistItem';

interface Props {
    artists: Artist[];
}

export default function ArtistsGridView(props: Props) {

    let elmArtists: JSX.Element[] = [];
    let index = 0;
    props.artists.forEach(artist => {

        elmArtists.push(<div className="col-20" key={index++}><LargeArtistItem artist={artist} /></div>);
    });

    return (
        <div className="album-content">
            <div className="d-flex flex-wrap">
                { elmArtists }
            </div>
        </div>
    )
}
