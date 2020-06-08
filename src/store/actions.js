export const setActiveComponent = component => ({
  type: "SET_ACTIVE_COMPONENT",
  payload: component
});

export const setLoaderStatus = status => ({
  type: "SET_LOADER_STATUS",
  payload: status
});

export const setUserData = ({ username, keys, is_admin }) => ({
  type: "SET_USER_DATA",
  payload: { username, keys, is_admin }
});
