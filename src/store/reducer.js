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
    case "SET_USER_DATA": {
      const { username, keys, is_admin } = action.payload;
      const new_state = { ...state, username, keys, is_admin };
      return new_state;
    }
    default: {
      return state;
    }
  }
};
