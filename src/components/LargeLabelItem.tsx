import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Publisher } from '../models';

import { selectCurrentTrack, selectPlayStatus } from '../redux/selectors';
import { PlayStatus } from '../redux/store';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { API_FETCH_ALBUM } from '../api/apis';
import LabelImage from '../assets/images/label.png';
interface Props {
    label: Publisher;
}

export default function LargeLabelItem(props: Props) {
    const dispatch = useDispatch();
    const currentTrack = useSelector(selectCurrentTrack);
    const playStatus = useSelector(selectPlayStatus);
    return (
        <Card>
            <div className="position-relative d-flex">
                <CardImg top
                         src={LabelImage}
                         alt="label"/>

            </div>
            <CardBody>
                <CardTitle>
                    <NavLink to={`/all-releases/label/${props.label != null ? props.label.slug : ''}/s/GRID/p/0`} className="genre-link">
                        {props.label != null ? props.label.name : '' }
                    </NavLink>
                </CardTitle>
            </CardBody>
        </Card>
    );
}
