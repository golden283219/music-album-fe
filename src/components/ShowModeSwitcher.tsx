import { Button, Col, Input, Row, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { ShowMode } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import React, { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, selectKeys, selectCurrentPage, selectShowMode } from '../redux/selectors';
import { changeShowModeLink } from '../common';
import history from '../history';
import { AriaAttributes, DOMAttributes } from "react";
import { requestTracks } from '../redux/actions';
import { albumCountPerPage, trackCountPerPage } from '../consts';
import { useEffect } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    rel?: string;
    active?: boolean;
  }
};

interface Props {
    disableGridMode?: boolean;
}



export default function ShowModeSwitcher(props: Props) {
    const showMode = useSelector(selectShowMode);
    const categories = useSelector(selectCategories);
    const keys = useSelector(selectKeys);

    const currentPage = useSelector(selectCurrentPage);
    const dispatch = useDispatch();
    const categoryCount = categories.length;

    const genresMenuWrapper = createRef<HTMLDivElement>();

    const [bpmlow, setBPMLow] = useState('');
    const bpmlowChangedHandler = (e: any) => {
        setBPMLow(e.target.value);
    }

    const [bpmhigh, setBPMHigh] = useState('');
    const bpmhighChangedHandler = (e: any) => {
        setBPMHigh(e.target.value);

    }
    useEffect(() => {
        setGenre(new Array(categories.length).fill(false));
        setKey(new Array(keys.length).fill(false));

    }, [categories.length, keys.length])

    const onApplyBPM = () => {

        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const onResetBPM = () => {
        setBPMLow('');
        setBPMHigh('');
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const [selectedKeys, setSelectedKeys] = useState(new Array());
    const [key, setKey] = useState(new Array(keys.length).fill(false));
    const keyChangedHandler = (position: number) => {
        const updatedCheckedState = key.map((item, index) =>
            index === position ? !item : item
        );
        
        setKey(updatedCheckedState);
        const selectedKeys = updatedCheckedState.reduce(
            (sum: number[], currentState, index) => {
              if (currentState === true) {
                sum.push(keys[index].id);

              }
              return sum;
            },
            []
        );
        
        setSelectedKeys(selectedKeys);

    }

    const onApplyKey = () => {
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const onResetKey = () => {
        setKey(new Array(keys.length).fill(false));
        setSelectedKeys(new Array());
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), '', selectedGenres.toString(), label, artist));
    }

    const [selectedGenres, setSelectedGenres] = useState(new Array());
    const [genre, setGenre] = useState(new Array(categories.length).fill(false));
    const genreChangedHandler = (position: number) => {
        const updatedCheckedState = genre.map((item, index) =>
            index === position ? !item : item
        );
        
        setGenre(updatedCheckedState);
        const selectedGenres = updatedCheckedState.reduce(
            (sum: number[], currentState, index) => {
              if (currentState === true) {
                sum.push(categories[index].id);

              }
              return sum;
            },
            []
        );
        
        setSelectedGenres(selectedGenres);

    }

    const onApplyGenre = () => {
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const onResetGenre = () => {
        setGenre(new Array(categories.length).fill(false));
        setSelectedGenres(new Array());
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), '', label, artist));
    }

    const [artist, setArtist] = useState('');
    const artistChangedHandler = (e: any) => {
        setArtist(e.target.value);
        
    }

    const onApplyArtist = () => {
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const onResetArtist = () => {
        setArtist('');
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, ''));
    }

    const [label, setLabel] = useState('');
    const labelChangedHandler = (e: any) => {
        setLabel(e.target.value);
        
    }
    const onApplyLabel = () => {
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), label, artist));
    }

    const onResetLabel = () => {
        setLabel('');
        dispatch(requestTracks(currentPage * trackCountPerPage, trackCountPerPage, '', Number.parseInt(bpmlow), Number.parseInt(bpmhigh), selectedKeys.toString(), selectedGenres.toString(), '', artist));
    }
    let categoryLinks: JSX.Element[] = [];
    
    categoryLinks.push(
        <Row>
            <Col></Col>
            <Col>
                <a href='#' className="filter-bpm-apply-button" onClick={onApplyGenre}> Apply </a>
                <a href='#' className="filter-bpm-apply-button" onClick={onResetGenre}> Reset </a>
            </Col>
        </Row>
        );
    for (let i = 0; i < categoryCount; i += 2) {
        
        const category1 = categories[i];
        const category2 = categories[i+1];
        categoryLinks.push(
        <Row className="py-2" key={i}>
            <Col>
                <Label check>
                    <Input type="checkbox" id={'genre-checkbox-' + i} checked={genre[i]} onChange={() => genreChangedHandler(i)}/>{' '}
                    {category1?.name}
                </Label>
            </Col>
            <Col>
            {/* <NavLink
                onClick={ () => {
                    if (genresMenuWrapper.current !== null) {
                        genresMenuWrapper.current.hidden = true;
                    }
                } }
                to={`/genres/${category2?.slug}/s/LIST/p/0`}
            >{category2?.name}</NavLink> */}
                <Label check>
                <Input type="checkbox" id={'genre-checkbox-' + i + 1} checked={genre[i+1]} onChange={() => genreChangedHandler(i+1)}/>{' '}
                    {category2?.name}
                </Label>
            </Col>
        </Row>);
        

    }

    const bpmMenuWrapper = createRef<HTMLDivElement>();
    let bpmInputBox:JSX.Element[] = [];
    bpmInputBox.push(
        <div>
            <input type='input' name='bpm-low' className="filter-bpm-range" placeholder='LOWEST' value={bpmlow} onChange={bpmlowChangedHandler}></input>
            <span className="filter-bpm-range-inbetween"> TO </span>
            <input type='input' name='bpm-high' className="filter-bpm-range" placeholder='HIGHEST' value={bpmhigh} onChange={bpmhighChangedHandler}></input>
            <a href='#' className="filter-bpm-apply-button" onClick={onApplyBPM}> Apply </a>
            <a href='#' className="filter-bpm-apply-button" onClick={onResetBPM}> Reset </a>
        </div>);

    const labelMenuWrapper = createRef<HTMLDivElement>();
    let labelInputBox:JSX.Element[] = [];
    labelInputBox.push(
        <div>
            <input type='input' name='label' className="filter-bpm-range" placeholder='LABEL' value={label} onChange={labelChangedHandler}></input>
            <a href='#' className="filter-bpm-apply-button" onClick={onApplyLabel}> Apply </a>
            <a href='#' className="filter-bpm-apply-button" onClick={onResetLabel}> Reset </a>
        </div>);
    
    const artistMenuWrapper = createRef<HTMLDivElement>();
    let artistInputBox:JSX.Element[] = [];
    artistInputBox.push(
        <div>
            <input type='input' name='label' className="filter-bpm-range" placeholder='ARTIST' value={artist} onChange={artistChangedHandler}></input>
            <a href='#' className="filter-bpm-apply-button" onClick={onApplyArtist}> Apply </a>
            <a href='#' className="filter-bpm-apply-button" onClick={onResetArtist}> Reset </a>
        </div>);

    const keyMenuWrapper = createRef<HTMLDivElement>();
    let keyInputBox:JSX.Element[] = [];
    keyInputBox.push(
        <Row>
            <Col>
                <a href='#' className="filter-bpm-apply-button" onClick={onApplyKey}> Apply </a>
                <a href='#' className="filter-bpm-apply-button" onClick={onResetKey}> Reset </a>
            </Col>
        </Row>
        );
    for (let i = 0; i < keys.length; i ++) {
    
        keyInputBox.push(
        <Row className="py-2" key={i}>
            <Col>
                <Label check>
                    <Input type="checkbox" id={'key-checkbox-' + i} checked={key[i]} onChange={() => keyChangedHandler(i)}/>{' '}
                    {keys[i]?.name}
                </Label>
            </Col>
        </Row>
        );
    }    
        
        
    return (<div className="d-flex align-items-center">

        <ul className="page-selectors">
            <li className="page-selector">
                <a
                    className={showMode === ShowMode.GRID ? "page-selector-link active" : "page-selector-link"} 
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.GRID);
                        history.push(newLink);
                    }} >
                    RELEASES
                </a>
            </li>
            <li className="page-selector">
                <a
                    className={showMode === ShowMode.LIST ? "page-selector-link active" : "page-selector-link"} 
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    TRACKS
                </a>
            </li>
        </ul>
        { showMode === ShowMode.LIST?
        <ul className="sub-page-selectors">
            <li className="sub-page-selector">
                {/* <a href="" 
                    className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.GRID);
                        history.push(newLink);
                    }} >
                    GENRE
                </a> */}
                <div className="genres-menu">
                    <span className="sub-page-selector-link" onMouseOver={() => {
                        if (genresMenuWrapper.current !== null) {
                            genresMenuWrapper.current.hidden = false;
                        }
                    }}>Genres</span>
                    <div className="position-absolute sub-menu-wrapper" ref={genresMenuWrapper}>
                        {
                            categoryLinks
                        }
                    </div>
                </div>
            </li>
            <li className="sub-page-selector">
                {/* <a 
                    href="" className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    BPM
                </a> */}
                <div className="bpm-menu">
                    <span className="sub-page-selector-link" onMouseOver={() => {
                        if (bpmMenuWrapper.current !== null) {
                            bpmMenuWrapper.current.hidden = false;
                        }
                    }}>BPM</span>
                    <div className="position-absolute bpm-menu-wrapper" ref={bpmMenuWrapper}>
                        {
                            bpmInputBox
                        }
                    </div>
                </div>
            </li>
            <li className="sub-page-selector">
                {/* <a 
                    href="" className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    KEY
                </a> */}
                <div className="key-menu">
                    <span className="sub-page-selector-link" onMouseOver={() => {
                        if (keyMenuWrapper.current !== null) {
                            keyMenuWrapper.current.hidden = false;
                        }
                    }}>KEY</span>
                    <div className="position-absolute key-menu-wrapper" ref={keyMenuWrapper}>
                        {
                            keyInputBox
                        }
                    </div>
                </div>
            </li>
            <li className="sub-page-selector">
                {/* <a 
                    href="" className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    LABEL
                </a> */}
                <div className="label-menu">
                    <span className="sub-page-selector-link" onMouseOver={() => {
                        if (labelMenuWrapper.current !== null) {
                            labelMenuWrapper.current.hidden = false;
                        }
                    }}>LABEL</span>
                    <div className="position-absolute label-menu-wrapper" ref={labelMenuWrapper}>
                        {
                            labelInputBox
                        }
                    </div>
                </div>
            </li>
            <li className="sub-page-selector">
                {/* <a 
                    href="" className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    LABEL
                </a> */}
                <div className="artist-menu">
                    <span className="sub-page-selector-link" onMouseOver={() => {
                        if (artistMenuWrapper.current !== null) {
                            artistMenuWrapper.current.hidden = false;
                        }
                    }}>ARTIST</span>
                    <div className="position-absolute artist-menu-wrapper" ref={artistMenuWrapper}>
                        {
                            artistInputBox
                        }
                    </div>
                </div>
            </li>
            <li className="sub-page-selector">
                <a 
                    href="" className="sub-page-selector-link" 
                    active={showMode === ShowMode.LIST}
                    onClick={() => {
                        const newLink = changeShowModeLink(ShowMode.LIST);
                        history.push(newLink);
                    }}>
                    RESET ALL
                </a>
            </li>
        </ul>
        :''
        }

        {/* <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.GRID}
            disabled={ props.disableGridMode !== undefined && props.disableGridMode }
            onClick={() => {
                const newLink = changeShowModeLink(ShowMode.GRID);
                history.push(newLink);
            }}>
            <FontAwesomeIcon icon={faThLarge}/>&nbsp;&nbsp;Grid
        </Button>
        <Button
            className="hl-control normal-control"
            active={showMode === ShowMode.LIST}
            onClick={() => {
                const newLink = changeShowModeLink(ShowMode.LIST);
                history.push(newLink);
            }}>
            <FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;List
        </Button> */}
        
    </div>);
}