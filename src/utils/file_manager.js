import * as _path from "path";
import * as web3utils from "web3-utils";
import { AUXILIARY_FOLDER, FILES_FOLDER } from "../configs/global";
import { encrypt, decrypt } from "./crypto";
import {
  getAppPath,
  getDirectoryContents,
  existItem,
  createFolder,
  writeFile,
  readFile
} from "./fs_assistant";

export const getFileNamesList = () => {
  const files_folder_path = _path.join(getAppPath(), AUXILIARY_FOLDER, FILES_FOLDER);
  return getDirectoryContents(files_folder_path) || [];
};

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
    file_data = JSON.parse(web3utils.toUtf8(file_data));
    return { ...file_data, path: file_path };
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
    let file_data = web3utils.toHex(JSON.stringify(data));
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
