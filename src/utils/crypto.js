import crypto from "crypto";
import { HASH_ALGORITHM, CIPHER_ALGORITHM, KEY_LENGTH, IV_LENGTH } from "../configs/global";
import { hexToByteArray } from "./helper";

export const generateKey = (password, salt) => {
  if (password === undefined) password = crypto.randomBytes(32);
  if (salt === undefined) salt = crypto.randomBytes(32);
  const iv = crypto.scryptSync(salt, password, IV_LENGTH);
  const key = crypto.scryptSync(password, salt, KEY_LENGTH);
  return `${iv.toString("hex")}${key.toString("hex")}`;
};

export const encrypt = (content, key_hex) => {
  const key_bytes = hexToByteArray(key_hex);
  const iv = key_bytes.slice(0, IV_LENGTH);
  const key = key_bytes.slice(IV_LENGTH);
  const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, iv);
  return cipher.update(content, "utf-8", "hex") + cipher.final("hex");
};

export const decrypt = (content, key_hex) => {
  const key_bytes = hexToByteArray(key_hex);
  const iv = key_bytes.slice(0, IV_LENGTH);
  const key = key_bytes.slice(IV_LENGTH);
  const message = crypto.createDecipheriv(CIPHER_ALGORITHM, key, iv);
  message.setAutoPadding(false);
  return message.update(content, "hex", "utf-8") + message.final("utf-8");
};

export const hash = content => {
  const result = crypto
    .createHash(HASH_ALGORITHM)
    .update(content)
    .digest("hex");
  return result;
};
