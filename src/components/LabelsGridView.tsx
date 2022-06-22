import React from 'react';
import { Publisher } from '../models';
import LargeLabelItem from './LargeLabelItem';

interface Props {
    labels: Publisher[];
}

export default function ArtistsGridView(props: Props) {

    let elmLabels: JSX.Element[] = [];
    let index = 0;
    props.labels.forEach(label => {

        elmLabels.push(<div className="col-20" key={index++}><LargeLabelItem label={label} /></div>);
    });

    return (
        <div className="album-content">
            <div className="d-flex flex-wrap">
                { elmLabels }
            </div>
        </div>
    )
}
