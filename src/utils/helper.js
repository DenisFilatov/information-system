import * as _path from "path";
import { AUXILIARY_FOLDER, USERS_FOLDER } from "../configs/global";
import { store } from "../index";
import { setUserData, setActiveComponent } from "../store/actions";
import { getAppPath, readFile } from "./fs_assistant";
import { generateKey, decrypt } from "./crypto";

export const hexToByteArray = hex => {
  const byte_array = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(i => parseInt(i, 16)));
  return byte_array;
};

export const removeSystemSymbols = str => {
  return str.replace(/[\2\3]/g, "");
};

export const isJsonString = content => {
  try {
    JSON.parse(content);
  } catch {
    return false;
  }
  return true;
};

export const isObject = obj => {
  return obj === Object(obj);
};

export const logIn = (username, password) => {
  const user_file_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER, username);
  const file_content = readFile(user_file_path);
  if (file_content) {
    const key = generateKey(password, username);
    const decrypted_content = decrypt(file_content, key);
    if (isJsonString(decrypted_content)) {
      const parsed_content = JSON.parse(decrypted_content);
      if (isObject(parsed_content) && parsed_content.keys) {
        const { username, keys, is_admin } = parsed_content;
        store.dispatch(setUserData({ username, keys, is_admin }));
        return { username, keys, is_admin };
      }
    }
  }
  return false;
};

export const logOut = () => {
  store.dispatch(setUserData({ username: undefined, keys: undefined, is_admin: undefined }));
  store.dispatch(setActiveComponent("auth_module"));
};
