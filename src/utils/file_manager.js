import * as _path from "path";
import { AUXILIARY_FOLDER, FILES_FOLDER } from "../configs/global";
import { getAppPath, existItem, createFolder, writeFile, readFile } from "./fs_assistant";
import { encrypt, decrypt } from "./crypto";

export const getDecryptFile = (name, keys = []) => {
  try {
    const file_path = _path.join(getAppPath(), AUXILIARY_FOLDER, FILES_FOLDER, name);
    if (!existItem(file_path)) return null;
    let file_data = readFile(file_path).split("#");
    const level = +file_data[0];
    file_data = `${file_data[1]}`;
    keys
      .slice(0, level)
      .reverse()
      .forEach(key => {
        file_data = decrypt(file_data, key);
      });
    return JSON.parse(file_data);
  } catch {
    return null;
  }
};

export const setEncryptFile = (data, keys = []) => {
  try {
    const file_name = `${+new Date()}`;
    const files_folder_path = _path.join(getAppPath(), AUXILIARY_FOLDER, FILES_FOLDER);
    if (!existItem(files_folder_path)) createFolder(files_folder_path);
    const file_path = _path.join(files_folder_path, file_name);
    let file_data = JSON.stringify(data);
    keys.forEach(key => {
      file_data = encrypt(file_data, key);
    });
    file_data = `${keys.length}#${file_data}`;
    writeFile(file_path, file_data);
    return file_name;
  } catch {
    return null;
  }
};
