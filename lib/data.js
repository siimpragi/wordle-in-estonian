const setObjectToLocalStorage = (key, object) => {
  const objectJSON = JSON.stringify(object);
  window.localStorage.setItem(key, objectJSON);
};

export const saveGame = (stateObject) => {
  setObjectToLocalStorage("game", stateObject);
};

export const saveStatistics = (stateObject) => {
  setObjectToLocalStorage("statistics", stateObject);
};

const getObjectFromLocalStorage = (key) => {
  const objectJSON = window.localStorage.getItem(key);
  return JSON.parse(objectJSON);
};

export const getSavedGame = () => {
  return getObjectFromLocalStorage("game");
};

export const getSavedStatistics = () => {
  return getObjectFromLocalStorage("statistics");
};
