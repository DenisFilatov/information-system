import { remote } from "electron";
import * as _path from "path";
import fs from "fs";

export const getAppPath = () => {
  return _path.dirname(remote.app.getAppPath());
};

export const existItem = path => {
  return fs.existsSync(path);
};

export const getDirectoryContents = path => {
  if (!existItem(path)) return null;
  return fs.readdirSync(path);
};

export const readFile = path => {
  if (!existItem(path)) return null;
  return fs.readFileSync(path, { encoding: "utf-8" });
};

export const writeFile = (path, data) => {
  fs.writeFileSync(path, data, { encoding: "utf-8" });
};

export const deleteFile = path => {
  if (!existItem(path)) return null;
  fs.unlinkSync(path);
};

export const deleteFolder = path => {
  if (existItem(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = _path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) deleteFolder(curPath);
      else deleteFile(curPath);
    });
    fs.rmdirSync(path);
  }
};

export const createFolder = path => {
  if (existItem(path)) deleteFolder(path);
  fs.mkdirSync(path);
};
