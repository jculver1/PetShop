export const fetchCats = () => {
  return fetch("http://localhost:3000/cats", {
    "Content-Type": "application/json",
  }).then((response) => response.json());
};

export const fetchDogs = () => {
  return fetch("http://localhost:3000/dogs", {
    "Content-Type": "application/json",
  }).then((response) => response.json());
};

export const editCatInfo = (id, updatedCatObj) => {
  return fetch("http://localhost:3000/cat/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCatObj),
  });
};

export const editDogInfo = (id, updateDogObj) => {
  return fetch("http://localhost:3000/dog/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateDogObj),
  });
};
