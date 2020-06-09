import { SERVICE_NAME } from "../configs/global";
import { ipcRenderer } from "electron";

export const setPassword = (username, password) => {
  const status = ipcRenderer.sendSync("set-password", SERVICE_NAME, username, password);
  return status;
};

export const getPassword = () => {
  const passwords = ipcRenderer.sendSync("get-service-passwords", SERVICE_NAME);
  return passwords[0];
};

export const deleteAllPasswords = () => {
  const status = ipcRenderer.sendSync("delete-service-passwords", SERVICE_NAME);
  return status;
};
