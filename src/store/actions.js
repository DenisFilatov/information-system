export const setActiveComponent = component => ({
  type: "SET_ACTIVE_COMPONENT",
  payload: component
});

export const setLoaderStatus = status => ({
  type: "SET_LOADER_STATUS",
  payload: status
});

export const setUsername = name => ({
  type: "SET_USERNAME",
  payload: name
});

export const setCryptoKeys = keys => ({
  type: "SET_CRYPTO_KEYS",
  payload: keys
});
