import React, {useState, useEffect, useCallback} from 'react';
import PetInfo from "./PetInfo";
import './PetList.scss';
import {fetchCats, fetchDogs} from '../apis';

const PetList = () => {
    const [cats, setCats] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [errorDetails, setErrorDetails] = useState({displayError: false, errorMessage: ""});
    const [petFilter, setPetFilter] = useState('cats');

    const displayListOfCats = cats.map(cat => {
        return (
            <PetInfo key={cat.name + cat.id} pet={cat} setErrorDetails={setErrorDetails} setPets={setCats}/>
        )
    })

    const displayListOfDogs = dogs.map(dog => {
        return(
            <PetInfo key={dog.name + dog.id} pet={dog} setErrorDetails={setErrorDetails} setPets={setDogs}/>
        )
    })

    useEffect(() => {
        fetchCats().then(res => {
            setCats(res)
        })
      },[])

      useEffect(() => {
        fetchDogs().then(res => {
            setDogs(res)
        })
      },[])
    
    return (
        <>
            <div className="page-header">
                <h2>{petFilter}</h2> 
                <button onClick={() => setPetFilter(petFilter === 'cats' ? 'dogs' : 'cats')}>{petFilter === "cats" ? "View Dogs" : "View Cats"}</button>
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