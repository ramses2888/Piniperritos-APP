import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_API_DOGS = "GET_API_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SEARCH_DOG = "SEARCH_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const TEMPERAMENT_CHANGE = "TEMPERAMENT_CHANGE"; 
export const DB_CHANGE = "DB_CHANGE";
export const CREATE_DOG = "CREATE_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_DB_DOGS = "GET_DB_DOGS";
export const HANDLE_ALPHABETIC_CHANGE = "HANDLE_ALPHABETIC_CHANGE";
export const HANDLE_WEIGHT_CHANGE = "HANDLE_WEIGHT_CHANGE";
export const ADD_TEMPERAMENT = "ADD_TEMPERAMENT";
export const SET_PAGES = "SET_PAGES";



export function getDogs(){
  return async function(dispatch){
      var dogs = await axios.get("http://localhost:3001/dogs");
      dispatch({
          type: GET_DOGS,
          payload: dogs
      })
      //.catch((error) => console.log(error));
  }
}

export function getApiDogs() {
  return {
    type: GET_API_DOGS,
  };
}

export function getTemperaments() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/temperament")
      .then((temperaments) => {
        dispatch({
          type: GET_TEMPERAMENTS,
          payload: temperaments,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function searchDog(search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dogs?name=" + search)
      .then((dog) => {
        dispatch({
          type: SEARCH_DOG,
          payload: dog,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteDog(id) {
  return function (dispatch) {
    axios.delete(`http://localhost:3001/dogs?id=${id}`).then((dogs) => {
      dispatch({
        type: DELETE_DOG,
        payload: dogs.data,
      });
    });
  };
}

export function handleTemperamentChange(temperament) {
  return {
    type: TEMPERAMENT_CHANGE,
    payload: temperament,
  };
  
}

export function handleDbChange(db) {
  return {
    type: DB_CHANGE,
    payload: db,
  };
}

export function createDog(dog) {
  return async function (dispatch) {
    var info = await axios.post("http://localhost:3001/dog", dog);
    return dispatch({
      type: CREATE_DOG,
      payload: info.data,
    });
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    var dog = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_DETAIL,
      payload: dog.data,
    });
  };
}

export function getDbDogs() {
  return {
    type: GET_DB_DOGS,
  };
}

export function handleAlphabeticChange(order) {
  return {
    type: HANDLE_ALPHABETIC_CHANGE,
    payload: order,
  };
}

export function handleWeightChange(order) {
  return {
    type: HANDLE_WEIGHT_CHANGE,
    payload: order,
  };
}

