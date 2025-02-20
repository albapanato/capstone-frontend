import Cookies from "js-cookie";

export const persistDataInCookies = (key, data) => {
  Cookies.set(key, JSON.stringify(data));
};

export const getPersistedDataFromCookies = (key) => {
  const data = Cookies.get(key);
  return data ? JSON.parse(data) : null;
};

export const deletePersistedDataFromCookies = (key) => {
  Cookies.remove(key);
};
