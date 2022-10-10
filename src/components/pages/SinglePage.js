
import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';

import { Component, useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";



const SinglePage = ({Component, dataType}) => {

    const {id} = useParams ();
    const [data, setData] = useState (null);

    const {error, loading, getComic, getCharacter, clearError} = useMarvelService ();


    useEffect(() => {
        updateData()
    }, [id])


    const updateData = () => {
        clearError ();
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }


    const onDataLoaded = (data) => {
        setData (data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !data) ? <Component data={data}/> : null


    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;