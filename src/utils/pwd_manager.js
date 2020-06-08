import keytar from "keytar";
import { SERVICE_NAME } from "../configs/global";

export const setPassword = (username, data, callback) => {
  keytar
    .setPassword(SERVICE_NAME, username, JSON.stringify(data))
    .then(callback)
    .catch(err => console.log(err));
};

export const getPassword = (username, callback) => {
  keytar
    .getPassword(SERVICE_NAME, username)
    .then(res => callback(JSON.parse(res)))
    .catch(err => console.log(err));
};

export const deletePassword = (username, callback) => {
  keytar
    .deletePassword(SERVICE_NAME, username)
    .then(callback)
    .catch(err => console.log(err));
};

export const deleteAllPassword = callback => {
  const promises = [];
  keytar
    .findCredentials(SERVICE_NAME)
    .then(res => res.forEach(user => promises.push(keytar.deletePassword(SERVICE_NAME, user.account))))
    .catch(err => console.log(err));
  Promise.all(promises).then(callback);
};
