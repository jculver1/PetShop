import React, {useState, useEffect, useCallback} from 'react';
import PetInfo from "./PetInfo";
import './PetList.scss';
import {fetchCats, fetchDogs} from '../helpers';

const PetList = () => {
    const [cats, setCats] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [errorDetails, setErrorDetails] = useState({displayError: false, errorMessage: ""});
    const [petFilter, setPetFilter] = useState('cats');

    const displayListOfCats = cats.map(cat => {
        
        return(
            <PetInfo key={cat.name} pet={cat} setErrorDetails={setErrorDetails} setCats={setCats}/>
        )
    })

    const displayListOfDogs = cats.map(dog => {
        return(
            <PetInfo key={dog.name} pet={dog} setErrorDetails={setErrorDetails}/>
        )
    })

    useEffect(() => {
        fetchCats().then(res => {
            setCats(res)
        })
      },[cats])

      useEffect(() => {
        fetchDogs().then(res => {
            setDogs(res)
        })
      },[dogs])
    
    return (
        <>
            <div>
                <h2>{petFilter}</h2> 
            </div>
            <div className='petlist-container'>
            {
              petFilter === 'cats' ? displayListOfCats : displayListOfDogs
            }
            </div>
        </>
    )
}

export default PetList;