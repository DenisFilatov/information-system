import * as _path from "path";
import { AUXILIARY_FOLDER, USERS_FOLDER } from "../configs/global";
import { getAppPath, getDirectoryContents, writeFile, readFile, deleteFile } from "./fs_assistant";
import { generateKey, encrypt, decrypt } from "./crypto";
import { isJsonString } from "./helper";

export const getUsersList = () => {
  const users_folder_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER);
  return getDirectoryContents(users_folder_path) || [];
};

export const setUser = (username, password, keys, is_admin = false) => {
  const user_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER, username);
  const user_data = JSON.stringify({ username, keys, is_admin });
  const key = generateKey(password, username);
  const encrypted_user_data = encrypt(user_data, key);
  writeFile(user_path, encrypted_user_data);
};

export const deleteUser = username => {
  const user_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER, username);
  deleteFile(user_path);
};

export const isAdminPassword = password => {
  const admin_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER, "admin");
  const file_content = readFile(admin_path);
  if (!file_content) return false;
  const key = generateKey(password, "admin");
  const decrypted_content = decrypt(file_content, key);
  if (isJsonString(decrypted_content)) return true;
  else return false;
};
