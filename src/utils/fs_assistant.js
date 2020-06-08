import { remote } from "electron";
import path from "path";
import fs from "fs";

export const getAppPath = () => {
  return path.dirname(remote.app.getAppPath());
};

export const existItem = item_path => {
  return fs.existsSync(item_path);
};

export const readFile = item_path => {
  if (!existItem(item_path)) return null;
  return fs.readFileSync(item_path, { encoding: "utf-8" });
};

export const writeFile = (item_path, data, callback) => {
  return fs.writeFileSync(item_path, data, { encoding: "utf-8" });
};

export const deleteFile = item_path => {
  return fs.unlinkSync(item_path);
};

export const deleteFolder = item_path => {
  if (existItem(item_path)) {
    fs.readdirSync(item_path).forEach(file => {
      const curPath = path.join(item_path, file);
      if (fs.lstatSync(curPath).isDirectory()) deleteFolder(curPath);
      else deleteFile(curPath);
    });
    fs.rmdirSync(item_path);
  }
};
