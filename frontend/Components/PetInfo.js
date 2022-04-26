import React, { useState } from 'react';
import { editCatInfo, editDogInfo } from '../apis'

const PetInfo = ({pet, setPets, setErrrorDetails}) => {
    const [editField, setEditField] = useState(false);
    const [petDetails, setPetDetails] = useState(pet)

    const editPetInfo = (e) => {
        petDetails[e.target.id] = e.target.value
    }

    const saveChanges = () => {
        if(pet.type === 'cat') {
            editCatInfo(pet.id, petDetails).then((resp) => {
                resp.json().then(resp => 
                    setPets(resp)
                ).catch(err => {
                    setErrrorDetails(err)
                })  
            })
        } else {
            editDogInfo(pet.id, petDetails).then((resp) => {
                resp.json()
                .then( resp => 
                    setPets(resp)
                    ).catch(err => {
                        setErrrorDetails(err)
                    })  
            })
        }
        setEditField(false);
        console.log(editField, 'edit fields')
    }

    const cancelChanges = () => {
        setPetDetails(pet);
        setEditField(false);
    }

    const displayFormOrPetInfo = () => {
        if (!editField) {
            return ( 
                <>
                    <div>
                        <h3>{pet.name}</h3>
                        <p>Arrival Date: {pet.checkedInDate}</p>
                    </div>
                   
                    <img className="pet-image" src={pet.img} alt="photo of pet"/>
                    <p>{pet.description}</p>
                    <button onClick={() => setEditField(true)}>Edit Details</button>
                </>
            )
        } else {
            return (
                <>
                    <form>
                        <label for="petName">Pet Name: </label>
                        <input onChange={(e) => editPetInfo(e)} type="text" id="name" placeholder={pet.name}/>
                        <label for="checkin">Arrival Date:</label>
                        <input type="date" id="checkedInDate" onChange={(e) => editPetInfo(e)} placeholder={pet.checkedInDate}/>

                        <label for="description">Description: </label>
                        <textarea id="description" name="description" onChange={(e) => editPetInfo(e)} placeholder={pet.description}/>

                    </form>
                    <button onClick={() => saveChanges()}>Save</button>
                    <button onClick={() => cancelChanges()}>Cancel</button>
                </>
            )
        }
    }

    return (
        <div className='petinfo-card'>
             {displayFormOrPetInfo()}
        </div>
 )
}

export default PetInfo;