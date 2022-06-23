import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { labelCountPerPage } from '../consts';
import { selectCurrentPage, selectPageCount, selectSearchModeValue, selectLabels } from '../redux/selectors';
import { setCurrentPage, requestLabelSearch } from '../redux/actions';

import AlbumPagination from '../components/AlbumPagination';
import { useParams } from 'react-router-dom';
import LabelsGridView from '../components/LabelsGridView';

export default function LabelPage() {

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
        dispatch(requestLabelSearch(keyword?keyword:'', currentPage * labelCountPerPage, labelCountPerPage));
    }, [dispatch, keyword, currentPage]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [ labels ]);

    return (
        <div className="page">

            <div className="d-flex justify-content-between">
                <p className="page-title">ARTISTS</p>

            </div>
            <LabelsGridView labels={labels}/>

            < div className="d-flex justify-content-center align-items-center">
                <AlbumPagination/>
            </div>
        </div>
    );
}
