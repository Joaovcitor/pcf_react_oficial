import * as types from "../types";

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      return newState;
    }
    case types.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }
    case types.REGISTER_SUCCESS: {
      const newState = { ...initialState };
      newState.user.email = action.payload.email;
      return newState;
    }
    case types.REGISTER_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }
    case types.REGISTER_REQUEST: {
      const newState = { ...initialState };
      return newState;
    }
    default:
      return state;
  }
}
