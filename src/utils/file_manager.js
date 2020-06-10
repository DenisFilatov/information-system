import * as _path from "path";
import { AUXILIARY_FOLDER, FILES_FOLDER } from "../configs/global";
import { getAppPath, existItem, createFolder, writeFile, readFile } from "./fs_assistant";
import { encrypt, decrypt } from "./crypto";
import { isJsonString } from "./helper";

export const getDecryptFile = (name, keys = []) => {
  const file_path = _path.join(getAppPath(), AUXILIARY_FOLDER, FILES_FOLDER, name);
  if (!existItem(file_path)) return null;
  let file_data = readFile(file_path);
  keys.reverse().forEach(key => {
    if (!isJsonString(file_data)) file_data = decrypt(file_data, key);
  });
  if (isJsonString(file_data)) return JSON.parse(file_data);
  else return null;
};

export const setEncryptFile = (data, keys = []) => {
  const file_name = `${+new Date()}`;
  const files_folder_path = _path.join(getAppPath(), AUXILIARY_FOLDER, FILES_FOLDER);
  if (!existItem(files_folder_path)) createFolder(files_folder_path);
  const file_path = _path.join(files_folder_path, file_name);
  let file_data = JSON.stringify(data);
  keys.forEach(key => {
    file_data = encrypt(file_data, key);
  });
  writeFile(file_path, file_data);
  return file_name;
};
