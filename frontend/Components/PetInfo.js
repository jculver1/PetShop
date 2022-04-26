import React, { useState } from "react";
import { editCatInfo, editDogInfo } from "../apis";

const PetInfo = ({ pet, setPets, setErrorDetails }) => {
  const [editField, setEditField] = useState(false);
  const [petDetails, setPetDetails] = useState({
    id: pet.id,
    type: pet.type,
    name: pet.name,
    description: pet.description,
    checkedInDate: pet.checkedInDate,
    img: pet.img,
    adoptionInfo: pet.adoptionInfo,
  });

  const editPetInfo = (e) => {
    petDetails[e.target.id] = e.target.value;
  };

  const daysInShelter = (date) => {
    let startDay = new Date(date);
    let today = new Date();
    let differenceInTime = today.getTime() - startDay.getTime();
    return Math.round(differenceInTime / (1000 * 3600 * 24));
  };

  const saveChanges = () => {
    if (pet.type === "cat") {
      editCatInfo(pet.id, petDetails).then((resp) => {
        resp
          .json()
          .then((resp) =>
            setPets(resp)
          )
          .catch((err) => {
            setErrorDetails(err.message);
          });
      });
    } else {
      editDogInfo(pet.id, petDetails).then((resp) => {
        resp
          .json()
          .then((resp) => setPets(resp))
          .catch((err) => {
            setErrorDetails(err.message);
          });
      });
    }
    setEditField(false);
  };

  const cancelChanges = () => {
    setPetDetails(pet);
    setEditField(false);
  };

  const displayFormOrPetInfo = () => {
    if (!editField) {
      return (
        <>
          <div>
            <h3>{pet.name}</h3>
            <p>
              Arrival Date: {pet.checkedInDate} Total Days:{" "}
              {daysInShelter(pet.checkedInDate)}
            </p>
          </div>

          <img className="pet-image" src={pet.img} alt="photo of pet" />
          <p>{pet.description}</p>

          {pet.adoptionInfo ? (
            <p> Adopted By: {pet.adoptionInfo.ownerName}</p>
          ) : (
            ""
          )}
          <button onClick={() => setEditField(true)}>Edit Details</button>
        </>
      );
    } else {
      return (
        <>
          <form>
            <label for="petName">Pet Name: </label>
            <input
              onChange={(e) => editPetInfo(e)}
              type="text"
              id="name"
              placeholder={pet.name}
            />
            <label for="checkin">Arrival Date:</label>
            <input
              type="date"
              id="checkedInDate"
              onChange={(e) => editPetInfo(e)}
              placeholder={pet.checkedInDate}
            />
            <label for="description">Description: </label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => editPetInfo(e)}
              placeholder={pet.description}
            />
          </form>
          <div className="submit-form-buttons">
            <button onClick={() => cancelChanges()}>Cancel</button>
            <button onClick={() => saveChanges()}>Save</button>
          </div>
        </>
      );
    }
  };

  return <div className="petinfo-card">{displayFormOrPetInfo()}</div>;
};

export default PetInfo;
