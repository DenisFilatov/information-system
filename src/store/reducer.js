import init_state from "./init_state";

export default (state = init_state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_COMPONENT": {
      const new_state = { ...state };
      new_state.active_component = action.payload;
      return new_state;
    }
    case "SET_LOADER_STATUS": {
      const new_state = { ...state };
      new_state.loader_status = action.payload;
      return new_state;
    }
    case "SET_USERNAME": {
      const new_state = { ...state };
      new_state.username = action.payload;
      return new_state;
    }
    case "SET_CRYPTO_KEYS": {
      const new_state = { ...state };
      new_state.crypto_keys = action.payload;
      return new_state;
    }
    default: {
      return state;
    }
  }
};
